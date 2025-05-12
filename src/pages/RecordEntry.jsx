import { useRef, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import {
  MicrophoneIcon,
  StopIcon,
  CalendarIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const moods = ["😊", "😢", "😡", "😱", "🤔", "❤️", "🌟"];

export default function RecordEntry() {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const [unlockAt, setUnlockAt] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const navigate = useNavigate();

  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        if (blob.size > 1_000_000) {
          setError("Audio too large (max 1MB). Please record a shorter message.");
          setAudioBlob(null);
        } else {
          setAudioBlob(blob);
        }
      };
      mediaRecorder.start();
      setRecording(true);
    } catch {
      setError("Could not access microphone.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!audioBlob) return setError("Please record an audio message.");
    if (!title || !unlockAt) return setError("Title and unlock date required.");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileName = `${Date.now()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("audio-entries")
        .upload(`${user.id}/${fileName}`, audioBlob, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("audio-entries").getPublicUrl(`${user.id}/${fileName}`);

      const audioUrl = publicUrl;

      const { error: dbError } = await supabase.from("entries").insert([
        {
          title,
          mood,
          unlock_at: unlockAt,
          audio_url: audioUrl,
          user_id: user.id,
        },
      ]);
      if (dbError) throw dbError;

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="py-8 sm:py-12 font-poppins">
      <div className="max-w-full sm:max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center mb-6 sm:mb-8 animate-fade-in font-space-mono">Record a New Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-sky-blue/20 animate-fade-in">
            <div className="mb-4 sm:mb-6">
              <label className="block font-medium text-text-dark mb-2 flex items-center gap-2 text-sm sm:text-base">
                <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-blue" /> Title
              </label>
              <input
                type="text"
                placeholder="Give your entry a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 bg-transparent border border-sky-blue/40 rounded-lg text-text-dark placeholder-gray-400 focus:ring-2 focus:ring-sky-blue transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block font-medium text-text-dark mb-2 flex items-center gap-2 text-sm sm:text-base">
                <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-blue" /> Mood
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {moods.map((m) => (
                  <button
                    type="button"
                    key={m}
                    className={`text-2xl sm:text-3xl p-2 sm:p-3 rounded-full transition-all duration-300 ${
                      m === mood
                        ? "bg-sky-blue/30 ring-2 ring-sky-blue"
                        : "bg-gray-800/50 hover:bg-sky-blue/20"
                    }`}
                    onClick={() => setMood(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block font-medium text-text-dark mb-2 flex items-center gap-2 text-sm sm:text-base">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-blue" /> Unlock Date
              </label>
              <input
                type="datetime-local"
                value={unlockAt}
                onChange={(e) => setUnlockAt(e.target.value)}
                required
                className="w-full p-3 bg-transparent border border-sky-blue/40 rounded-lg text-text-dark placeholder-gray-400 focus:ring-2 focus:ring-sky-blue transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="text-center">
                {recording ? (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-text-dark font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 flex items-center gap-1 sm:gap-2 mx-auto animate-pulse-glow text-sm sm:text-base"
                  >
                    <StopIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Stop Recording
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="bg-gradient-to-r from-deep-blue to-sky-blue text-text-dark font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 flex items-center gap-1 sm:gap-2 mx-auto animate-pulse-glow text-sm sm:text-base"
                  >
                    <MicrophoneIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Start Recording
                  </button>
                )}
              </div>
              {audioBlob && (
                <div className="mt-3 sm:mt-4">
                  <audio controls src={URL.createObjectURL(audioBlob)} className="w-full rounded-lg shadow-md bg-gray-800/50" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-deep-blue to-sky-blue text-text-dark font-medium py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 animate-pulse-glow text-sm sm:text-base"
            >
              Save Entry
            </button>

            {error && (
              <div className="text-red-400 text-xs sm:text-sm text-center mt-3 sm:mt-4 bg-red-900/20 p-3 rounded-lg">{error}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
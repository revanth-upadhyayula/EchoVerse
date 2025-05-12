import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import { LockClosedIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function EntryDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      const { data } = await supabase.from("entries").select("*").eq("id", id).single();
      setEntry(data);
      setReflection(data?.reflection || "");
    };
    fetchEntry();
  }, [id]);

  const handleSaveReflection = async () => {
    setSaving(true);
    await supabase.from("entries").update({ reflection }).eq("id", id);
    setSaving(false);
  };

  if (!entry) return <div className="text-center py-8 text-gray-300 text-sm sm:text-base font-poppins">Loading...</div>;

  const isLocked = new Date() < new Date(entry.unlock_at);

  return (
    <div className="max-w-full sm:max-w-xl mx-auto my-8 sm:my-12 px-4 sm:px-6 font-poppins">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-sky-blue/20 animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-bold text-text-dark mb-4 font-space-mono">{entry.title}</h2>
        <div className="text-xs sm:text-sm text-gray-300 mb-2">
          Mood: <span className="font-medium text-text-dark">{entry.mood}</span>
        </div>
        <div className="text-xs sm:text-sm text-gray-300 mb-2">Created: {new Date(entry.created_at).toLocaleString()}</div>
        <div className="text-xs sm:text-sm text-gray-300 mb-4">Unlocks: {new Date(entry.unlock_at).toLocaleString()}</div>
        {isLocked ? (
          <div className="text-yellow-400 font-semibold text-center bg-yellow-900/20 p-4 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
            <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" /> This entry is still locked!
          </div>
        ) : (
          <>
            <audio controls src={entry.audio_url} className="w-full my-4 sm:my-6 rounded-lg shadow-md bg-gray-800/50" />
            <div>
              <label className="block font-medium text-text-dark mb-2 flex items-center gap-2 text-sm sm:text-base">
                <ChatBubbleLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-blue" /> Reflect:
              </label>
              <textarea
                rows={3}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full p-3 bg-transparent border border-sky-blue/40 rounded-lg text-text-dark placeholder-gray-400 focus:ring-2 focus:ring-sky-blue transition-all duration-300 text-sm sm:text-base"
              />
              <button
                onClick={handleSaveReflection}
                disabled={saving}
                className={`mt-4 w-full bg-gradient-to-r from-deep-blue to-sky-blue text-text-dark font-medium py-3 rounded-lg transition-all duration-300 animate-pulse-glow text-sm sm:text-base ${
                  saving ? "opacity-50 cursor-not-allowed" : "hover:bg-gradient-to-l"
                }`}
              >
                {saving ? "Saving..." : "Save Reflection"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
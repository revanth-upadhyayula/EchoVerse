import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { Link } from "react-router-dom";
import { PlusIcon, LockClosedIcon, PlayIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeCapsule, setTimeCapsule] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setEntries(data || []);
      setLoading(false);
    };
    fetchEntries();

    // Fetch time capsule preference
    const fetchTimeCapsule = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("user_preferences")
        .select("time_capsule")
        .eq("user_id", user.id)
        .single();
      setTimeCapsule(data?.time_capsule || false);
    };
    fetchTimeCapsule();
  }, []);

  return (
    <div className="py-8 sm:py-12 font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark animate-fade-in font-space-mono">Your Echoes</h2>
          <Link
            to="/record"
            className="bg-gradient-to-r from-deep-blue to-sky-blue text-white font-medium px-4 sm:px-5 py-2 rounded-lg hover:bg-gradient-to-l transition-all duration-300 flex items-center gap-1 sm:gap-2 animate-pulse-glow text-sm sm:text-base"
          >
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" /> New Entry
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-t-sky-blue border-gray-200 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : timeCapsule ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-sky-blue/20">
            <p className="text-gray-1000 text-sm sm:text-base">
              Time Capsule Mode is ON. All your entries are hidden until 1 year from now.
            </p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-sky-blue/20">
            <p className="text-gray-300 text-sm sm:text-base">No entries yet. Create your first echo!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => {
              const isLocked = new Date() < new Date(entry.unlock_at);
              return (
                <div
                  key={entry.id}
                  className="bg-white/5 backdrop-blur-md rounded-lg shadow-md p-4 sm:p-6 border border-sky-blue/20 animate-fade-in"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-3xl sm:text-4xl">{entry.mood || "✨"}</span>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-text-dark font-space-mono">{entry.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-300">
                          {isLocked
                            ? `🔒 Locked – Unlocks on ${new Date(entry.unlock_at).toLocaleString()}`
                            : `Unlocked on ${new Date(entry.unlock_at).toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    {!isLocked ? (
                      <Link
                        to={`/entry/${entry.id}`}
                        className="bg-gradient-to-r from-deep-blue to-sky-blue text-white font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gradient-to-l transition-all duration-300 flex items-center gap-1 sm:gap-2 animate-pulse-glow text-sm sm:text-base"
                      >
                        <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Listen
                      </Link>
                    ) : (
                      <LockClosedIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
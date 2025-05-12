import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function Settings() {
  const [timeCapsule, setTimeCapsule] = useState(false);

  useEffect(() => {
    const fetchPrefs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("user_preferences")
        .select("time_capsule")
        .eq("user_id", user.id)
        .single();
      setTimeCapsule(data?.time_capsule || false);
    };
    fetchPrefs();
  }, []);

  const handleToggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setTimeCapsule((prev) => !prev);
    await supabase
      .from("user_preferences")
      .upsert({ user_id: user.id, time_capsule: !timeCapsule });
  };

  return (
    <div className="max-w-full sm:max-w-xl mx-auto my-8 sm:my-12 px-4 sm:px-6 font-poppins">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-sky-blue/20 animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-bold text-text-dark mb-4 sm:mb-6 font-space-mono">Settings</h2>
        <div className="flex items-center gap-3 sm:gap-4 bg-gray-800/50 p-4 rounded-lg border border-sky-blue/20">
          <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-blue" />
          <input
            type="checkbox"
            checked={timeCapsule}
            onChange={handleToggle}
            className="w-4 h-4 sm:w-5 sm:h-5 accent-sky-blue rounded focus:ring-2 focus:ring-sky-blue"
          />
          <span className="text-text-dark text-sm sm:text-base">Time Capsule Mode (Hide all entries until 1 year from now)</span>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Settings() {
  const [timeCapsule, setTimeCapsule] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrefs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("user_preferences")
        .select("time_capsule")
        .eq("user_id", user.id)
        .single();
      if (error) {
        console.error("Error fetching preferences:", error.message);
        return;
      }
      setTimeCapsule(data?.time_capsule || false);
    };
    fetchPrefs();
  }, []);

  const handleToggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const newValue = !timeCapsule;
    setTimeCapsule(newValue);
    const { error } = await supabase
      .from("user_preferences")
      .upsert({ user_id: user.id, time_capsule: newValue });
    if (error) {
      console.error("Error updating preferences:", error.message);
      setTimeCapsule(!newValue); // Revert on error
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError("");
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user || userError) {
      setDeleteError("Could not get user info.");
      setDeleting(false);
      return;
    }
    // Delete user using Supabase's admin API (via RPC)
    const { error: deleteError } = await supabase.rpc('delete_user');
    if (deleteError) {
      setDeleteError(deleteError.message || "Failed to delete account.");
      setDeleting(false);
      return;
    }
    // Sign out after deletion
    await supabase.auth.signOut();
    setDeleting(false);
    navigate("/auth");
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
      {/* Delete Account Section */}
      <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-sky-blue/20 animate-fade-in">
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-l transition-all duration-300 shadow animate-pulse-glow"
        >
          Delete Account
        </button>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg max-w-xs w-full border border-red-500/40 text-center">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-red-400 mb-2">Delete Account?</h4>
            <p className="text-text-dark mb-4 text-sm">This action is <span className="font-bold text-red-400">permanent</span> and will delete your account and all your data. Are you sure?</p>
            {deleteError && <div className="text-red-400 text-sm mb-2">{deleteError}</div>}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-l transition-all duration-300 shadow"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-600 transition-all duration-300"
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
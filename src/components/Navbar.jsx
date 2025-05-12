import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import { HomeIcon, PlusIcon, CogIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-deep-blue to-midnight-blue bg-opacity-90 backdrop-blur-md py-3 sm:py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-space-mono"
        >
          {/* Microphone SVG */}
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 314 314" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M254.217,135.559c0-3.866-3.134-7-7-7h-19.805V74.012C227.412,33.201,195.826,0,157.001,0 c-38.826,0-70.413,33.201-70.413,74.012v54.547H66.783c-3.866,0-7,3.134-7,7c0,47.963,32.466,88.205,75.804,98.347v40.544H116.05 c-11.736,0-21.284,8.871-21.284,19.775S104.313,314,116.05,314h81.9c11.736,0,21.285-8.871,21.285-19.775 s-9.549-19.775-21.285-19.775h-19.537v-40.543C221.751,223.764,254.217,183.521,254.217,135.559z M157.001,14 c24.9,0,46.069,17.259,53.53,41.117h-27.854c-3.866,0-7,3.134-7,7s3.134,7,7,7h30.532c0.123,1.616,0.203,3.245,0.203,4.895v23.775 h-30.735c-3.866,0-7,3.134-7,7c0,3.866,3.134,7,7,7h30.735v23.771c0,1.649-0.08,3.279-0.203,4.896h-30.532c-3.866,0-7,3.134-7,7 s3.134,7,7,7h27.854c-7.461,23.858-28.63,41.117-53.53,41.117c-24.901,0-46.07-17.259-53.531-41.117h27.853c3.866,0,7-3.134,7-7 s-3.134-7-7-7h-30.532c-0.123-1.616-0.203-3.246-0.203-4.896v-23.773h30.735c3.866,0,7-3.134,7-7c0-3.866-3.134-7-7-7h-30.735 V74.012c0-1.649,0.08-3.278,0.203-4.895h30.532c3.866,0,7-3.134,7-7s-3.134-7-7-7h-27.854C110.93,31.259,132.1,14,157.001,14z M74.051,142.559h12.86c3.368,37.539,33.511,67.013,70.09,67.013c36.578,0,66.721-29.474,70.088-67.013h12.86 c-3.427,44.611-39.32,79.816-82.948,79.816C113.372,222.375,77.478,187.17,74.051,142.559z M205.235,294.225 c0,3.131-3.336,5.775-7.285,5.775h-81.9c-3.948,0-7.284-2.645-7.284-5.775c0-3.131,3.336-5.775,7.284-5.775h81.9 C201.899,288.449,205.235,291.094,205.235,294.225z M164.413,274.449h-14.826v-38.365c2.447,0.192,4.92,0.291,7.414,0.291 c2.493,0,4.965-0.099,7.412-0.291V274.449z" fill="white"/>
          </svg>
          EchoVerse
        </Link>

        {/* Hamburger Menu Icon for small screens */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white  focus:outline-none">
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row sm:items-center absolute sm:static top-14 left-0 w-full sm:w-auto bg-gradient-to-r from-deep-blue to-midnight-blue sm:bg-none p-4 sm:p-0 sm:gap-4 font-poppins`}
        >
          <Link
            to="/dashboard"
            className="text-white  font-medium hover:text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Dashboard
          </Link>
          <Link
            to="/record"
            className="text-white  font-medium hover:text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" /> New Entry
          </Link>
          <Link
            to="/settings"
            className="text-white  font-medium hover:text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <CogIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Settings
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="text-white  font-medium hover:text-text-dark px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
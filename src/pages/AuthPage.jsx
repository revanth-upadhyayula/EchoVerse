import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { UserIcon, KeyIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    console.log(result);
    if (result.error) setError(result.error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="w-full max-w-sm sm:max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-dark text-center mb-6 sm:mb-8 animate-fade-in flex items-center justify-center gap-2 font-space-mono">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 314 314" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M254.217,135.559c0-3.866-3.134-7-7-7h-19.805V74.012C227.412,33.201,195.826,0,157.001,0 c-38.826,0-70.413,33.201-70.413,74.012v54.547H66.783c-3.866,0-7,3.134-7,7c0,47.963,32.466,88.205,75.804,98.347v40.544H116.05 c-11.736,0-21.284,8.871-21.284,19.775S104.313,314,116.05,314h81.9c11.736,0,21.285-8.871,21.285-19.775 s-9.549-19.775-21.285-19.775h-19.537v-40.543C221.751,223.764,254.217,183.521,254.217,135.559z M157.001,14 c24.9,0,46.069,17.259,53.53,41.117h-27.854c-3.866,0-7,3.134-7,7s3.134,7,7,7h30.532c0.123,1.616,0.203,3.245,0.203,4.895v23.775 h-30.735c-3.866,0-7,3.134-7,7c0,3.866,3.134,7,7,7h30.735v23.771c0,1.649-0.08,3.279-0.203,4.896h-30.532c-3.866,0-7,3.134-7,7 s3.134,7,7,7h27.854c-7.461,23.858-28.63,41.117-53.53,41.117c-24.901,0-46.07-17.259-53.531-41.117h27.853c3.866,0,7-3.134,7-7 s-3.134-7-7-7h-30.532c-0.123-1.616-0.203-3.246-0.203-4.896v-23.773h30.735c3.866,0,7-3.134,7-7c0-3.866-3.134-7-7-7h-30.735 V74.012c0-1.649,0.08-3.278,0.203-4.895h30.532c3.866,0,7-3.134,7-7s-3.134-7-7-7h-27.854C110.93,31.259,132.1,14,157.001,14z M74.051,142.559h12.86c3.368,37.539,33.511,67.013,70.09,67.013c36.578,0,66.721-29.474,70.088-67.013h12.86 c-3.427,44.611-39.32,79.816-82.948,79.816C113.372,222.375,77.478,187.17,74.051,142.559z M205.235,294.225 c0,3.131-3.336,5.775-7.285,5.775h-81.9c-3.948,0-7.284-2.645-7.284-5.775c0-3.131,3.336-5.775,7.284-5.775h81.9 C201.899,288.449,205.235,291.094,205.235,294.225z M164.413,274.449h-14.826v-38.365c2.447,0.192,4.92,0.291,7.414,0.291 c2.493,0,4.965-0.099,7.412-0.291V274.449z" fill="#1E3A8A"/>
          </svg>
          EchoVerse
        </h1>
        <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-sky-blue/20 shadow-lg animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="relative">
              <UserIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-blue" />
              <input
                className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-transparent border border-sky-blue/40 rounded-lg text-text-dark placeholder-gray-400 focus:ring-2 focus:ring-sky-blue transition-all duration-300 text-sm sm:text-base"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <KeyIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-blue" />
              <input
                className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-transparent border border-sky-blue/40 rounded-lg text-text-dark placeholder-gray-400 focus:ring-2 focus:ring-sky-blue transition-all duration-300 text-sm sm:text-base"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-gradient-to-r from-deep-blue to-sky-blue text-text-dark py-3 rounded-lg font-semibold hover:bg-gradient-to-l transition-all duration-300 flex items-center justify-center gap-2 animate-pulse-glow text-sm sm:text-base"
              type="submit"
            >
              <ArrowRightCircleIcon className="w-5 h-5" />
              {isLogin ? "Login" : "Register"}
            </button>
            {error && <div className="text-red-400 text-center text-sm">{error}</div>}
          </form>
          <div className="mt-4 sm:mt-6 text-center">
            <button
              type="button"
              className="text-sky-blue font-medium hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Need an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
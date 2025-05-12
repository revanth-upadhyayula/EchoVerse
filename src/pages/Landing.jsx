import { MicrophoneIcon, CalendarIcon, PlayIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Landing() {
  const steps = [
    {
      icon: <MicrophoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-sky-blue" />,
      title: "Record Your Voice",
      description: "Capture your thoughts and emotions in an audio diary.",
    },
    {
      icon: <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-sky-blue" />,
      title: "Set a Future Date",
      description: "Choose when to unlock your memories.",
    },
    {
      icon: <PlayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-sky-blue" />,
      title: "Listen & Reflect",
      description: "Revisit your past self and add reflections.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 font-poppins">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-dark mb-4 sm:mb-6 animate-fade-in flex items-center justify-center gap-2 sm:gap-3 font-space-mono">
        <svg className="w-7 h-7 sm:w-6 sm:h-6" viewBox="0 0 314 314" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M254.217,135.559c0-3.866-3.134-7-7-7h-19.805V74.012C227.412,33.201,195.826,0,157.001,0 c-38.826,0-70.413,33.201-70.413,74.012v54.547H66.783c-3.866,0-7,3.134-7,7c0,47.963,32.466,88.205,75.804,98.347v40.544H116.05 c-11.736,0-21.284,8.871-21.284,19.775S104.313,314,116.05,314h81.9c11.736,0,21.285-8.871,21.285-19.775 s-9.549-19.775-21.285-19.775h-19.537v-40.543C221.751,223.764,254.217,183.521,254.217,135.559z M157.001,14 c24.9,0,46.069,17.259,53.53,41.117h-27.854c-3.866,0-7,3.134-7,7s3.134,7,7,7h30.532c0.123,1.616,0.203,3.245,0.203,4.895v23.775 h-30.735c-3.866,0-7,3.134-7,7c0,3.866,3.134,7,7,7h30.735v23.771c0,1.649-0.08,3.279-0.203,4.896h-30.532c-3.866,0-7,3.134-7,7 s3.134,7,7,7h27.854c-7.461,23.858-28.63,41.117-53.53,41.117c-24.901,0-46.07-17.259-53.531-41.117h27.853c3.866,0,7-3.134,7-7 s-3.134-7-7-7h-30.532c-0.123-1.616-0.203-3.246-0.203-4.896v-23.773h30.735c3.866,0,7-3.134,7-7c0-3.866-3.134-7-7-7h-30.735 V74.012c0-1.649,0.08-3.278,0.203-4.895h30.532c3.866,0,7-3.134,7-7s-3.134-7-7-7h-27.854C110.93,31.259,132.1,14,157.001,14z M74.051,142.559h12.86c3.368,37.539,33.511,67.013,70.09,67.013c36.578,0,66.721-29.474,70.088-67.013h12.86 c-3.427,44.611-39.32,79.816-82.948,79.816C113.372,222.375,77.478,187.17,74.051,142.559z M205.235,294.225 c0,3.131-3.336,5.775-7.285,5.775h-81.9c-3.948,0-7.284-2.645-7.284-5.775c0-3.131,3.336-5.775,7.284-5.775h81.9 C201.899,288.449,205.235,291.094,205.235,294.225z M164.413,274.449h-14.826v-38.365c2.447,0.192,4.92,0.291,7.414,0.291 c2.493,0,4.965-0.099,7.412-0.291V274.449z" fill="#1E3A8A"/>
          </svg>
          EchoVerse
        </h1>
        <p className="text-base sm:text-lg text-text-dark max-w-xl mx-auto leading-relaxed">
          Your Audio Time Capsule. Record today, rediscover tomorrow.
        </p>
        <Link
          to="/auth"
          className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-deep-blue to-sky-blue text-white font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 animate-pulse-glow text-sm sm:text-base"
        >
          <ArrowRightCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Get Started
        </Link>
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center mb-8 sm:mb-12 animate-fade-in font-space-mono">
          How It Works
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-sky-blue/20 flex items-center gap-3 sm:gap-4 animate-fade-in"
            >
              {step.icon}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-text-dark font-space-mono">{step.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
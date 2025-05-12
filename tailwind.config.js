/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-blue": "#1E3A8A",
        "midnight-blue": "#2563EB",
        "sky-blue": "#60A5FA",
        "text-dark": "#1E3A8A",
      },
      backgroundImage: {
        "star-field":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Ccircle cx='4' cy='4' r='0.5' fill='%231E3A8A' fill-opacity='0.3'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "pulse-glow": "pulseGlow 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(96, 165, 250, 0.3)" },
          "50%": { boxShadow: "0 0 15px rgba(96, 165, 250, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
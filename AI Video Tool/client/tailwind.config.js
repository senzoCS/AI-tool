// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Optional custom theme colors
        secondary: "#1e293b",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'ai-gradient': 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      },
    },
  },
  plugins: [],
}

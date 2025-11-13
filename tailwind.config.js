/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1d4ed8",
        },
        grayBg: "#f9fafb",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        panel: "0 0 12px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

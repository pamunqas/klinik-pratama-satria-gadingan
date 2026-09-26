import type { Config } from "tailwindcss";

/**
 * Brand palette Klinik Pratama Satria Gadingan.
 * Sumber kebenaran: SPEC + 03-decisions.md.
 */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-soft": "#6FB897",
        "primary-dark": "#2E7D5B",
        "surface-soft": "#FDFDFC",
        "surface-pale": "#EAF5EE",
        "accent-peach": "#F6C9B8",
        "accent-sand": "#F5E6C8",
        "text-primary": "#333B3D",
        "text-secondary": "#707B7D",
        "border-soft": "#DCE3E5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      xs: "350px",
      sm: "540px",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      xxl: "1320px",
    },
    extend: {
      fontFamily: {
        title: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        primary: "#0D99FF",
        bg: "#F1F4FA",
      }
    },
  },
  plugins: [],
} satisfies Config;

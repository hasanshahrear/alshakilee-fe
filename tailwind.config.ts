import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        title: ['"Space Grotesk"', "sans-serif"],
      },
      colors: {
        primary: "#0D99FF",
        bg: "#F1F4FA",
        title: "#161717",
        bodyText: "#637381",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;

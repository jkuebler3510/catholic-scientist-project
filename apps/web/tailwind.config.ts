import type { Config } from "tailwindcss";
import tailwindPreset from "@catholic-scientists/config/tailwind";

const config: Config = {
  presets: [tailwindPreset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
};

export default config;

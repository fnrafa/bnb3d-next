import type {Config} from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            animation: {
                bounceSlow: "bounce 3s infinite",
                pulseFast: "pulse 1s infinite",
            },
            colors: {
                background: {
                    DEFAULT: "#0f0e17",
                },
                text: {
                    headline: "#ffffff",
                    paragraph: "#a7a9be",
                    button: "#ffffff",
                },
                button: {
                    DEFAULT: "#ff8906",
                    text: "#ffffff",
                },
                stroke: "black",
                main: "#ffffff",
                highlight: "#ff8906",
                secondary: "#f25f4c",
                tertiary: "#e53170",
            },
            fontFamily: {
                Prompt: ["Prompt", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;

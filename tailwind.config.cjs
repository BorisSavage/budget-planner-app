/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            transitionTimingFunction: {
                "savage-sig": "cubic-bezier(.17,.67,.28,1)",
                "savage-sig-2": "cubic-bezier(.2,.8,.2,1)",
                "mb-phi": "cubic-bezier(.0426,.6146,.5158,1.0298)",
            },
        },
    },
    plugins: [],
};

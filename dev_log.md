First commit

    Create a basic expo app using   
        npx create-expo-app@latest
    Remove the existing things using
        npm run reset-project
    Create the pages and routing structure
    Initiate git using
        git init
        git add .
        git commit -m "first commit"
        git remote add origin https://github.com/sanket-kumar-singh/expo-app.git
        git branch -M main
        git push -u origin main


Second Commit - Adding Native Wind
    Copy expo installation command from this link
    https://www.nativewind.dev/docs/getting-started/installation
    npx expo install nativewind tailwindcss@^3.4.17 react-native-reanimated@3.16.2 react-native-safe-area-context

    npx tailwindcss init
    replace the tailwind config with this code
        /** @type {import('tailwindcss').Config} */
        module.exports = {
        // NOTE: Update this to include the paths to all of your component files.
        content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
        presets: [require("nativewind/preset")],
        theme: {
            extend: {},
        },
        plugins: [],
        }

    Create CSS file in app folder called globals.css

    crete babel.config.js and paste fol code
        module.exports = function (api) {
        api.cache(true);
        return {
            presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
            ],
        };
        };

    npx expo customize metro.config.js
    paste this code into metro config
        const { getDefaultConfig } = require("expo/metro-config");
        const { withNativeWind } = require('nativewind/metro');
        
        const config = getDefaultConfig(__dirname)
        
        module.exports = withNativeWind(config, { input: './global.css' })

    import "./globals.css"; in layout.tsx file

    create a nativewind-env.d.ts file in app/root folder and paster this 
        /// <reference types="nativewind/types" />

    replace ./global.css in metro config with ./app/globals.css

    create a component in index.tsx file to test tailwind
        <Text className="font-bold text-lg my-10">Welcome to realestate</Text>

    ctrl + C server and start again
    then press r to reload 

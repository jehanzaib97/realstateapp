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


Third Commit - Adding Font and assets
    Paster fonts into assets/fonts folder
    Add constants in consts folder || Optional
        Constants is used to add static data for testing

   Update the icon references in app.json

   add all fonts in app.json plugins like this 

        [
            "expo-font",
            {
            "fonts": [
                "./assets/fonts/Rubik-Bold.ttf",
                "./assets/fonts/Rubik-Regular.ttf",
                "./assets/fonts/Rubik-Medium.ttf",
                "./assets/fonts/Rubik-SemiBold.ttf",
                "./assets/fonts/Rubik-ExtraBold.ttf",
                "./assets/fonts/Rubik-Light.ttf"
            ]
            }
        ]

    Update the expo-splash-screen settings (Screen that displays when app is loading)
        [
            "expo-splash-screen",
            {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 200,
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
            }
        ],


    Update the _layout.tsx file to include the fonts
    Update the tailwind.config.js and add all the fonts and colors
    create image.d.ts in root folder of application to resolve the icons.ts issue in constants

Fouth Commit - Creating UI
    Add the headerShown to false in layout to remove the header from the app so that real UI can be implimented
    Change view to <SafeAreaView> to remove to fit the text in screen
    create the rest of the components


Fifth Commit - Setting up appwrite for Google Auth\
    Create an account on appwrite and create a new project\
    Go to Auth -> Setting -> Google auth\
    Complete the rest of the process\
    Add a new platform in appwrite for web app. Set the second option to * \
    create a new .env.local file in root folder\
    Add appwrite project id and endpoint\


    Create a lib folder and create appwrrite.ts file\
    set the connection, login, logout etc functions in appwrite.ts file\
    impliment the newly created login function inside handleLogin function in signin.tsx
    create useAppwrite.ts file in lib folder and add the repeated code into functions
    create global-provider.tsx in lib to check auth and fetch current user 
    Update the _layout.tsx to include the global provider
    if you get the error in loggin using Google. Check the error details and add the redirect URL to google OAuth console
    update the sign-in.tsx file to redirect logged in users to the home page
    create a new parent layout in root folder to redirect the logged in and not logged in users accordingly
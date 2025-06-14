import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
    const {isLoggedIn, loading} = useGlobalContext();

    if(loading){
        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator size="large" className="text-primary-300"/>
            </SafeAreaView>
        )
    }


    if(!isLoggedIn){
        return <Redirect href="/sign-in" />
    }  

    return <Slot />
}
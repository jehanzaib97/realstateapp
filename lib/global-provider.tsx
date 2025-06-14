import { createContext, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch : (newParams?: Record<string, string|number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined >(undefined);

export const GlobalProvider = ({children} : {children: React.ReactNode}) => {
    const {
        data: user,
        loading,
        refetch
    } = useAppwrite ({
        fn : getCurrentUser,
    });
    const isLoggedIn = !!user;
    //  Double exclaimation will turn null into false and if any object is there it will give true; 
    // !null = true then !!null = false
    // !{name : "John"} = false then !!{name : "John"} = true


    // console.log(JSON.stringify(user, null, 2));

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}


export  default GlobalProvider;
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";



export const config ={
    platform : 'com.jsm.restate',
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)


export const account = new Account(client);
export const avatar = new Avatars(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");
    console.log("Redirect URI:", redirectUri);


    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout(){
    try{
        const session = await account.deleteSession('current');
        if(!session) throw new Error('No session found');
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}


export  async function getCurrentUser(){
    try{
        const response = await account.get();
        if(!response) throw new Error('No response found');
        if(response.$id){
            const UserAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: UserAvatar.toString(),
            }
        }
    }catch(error){
        console.log(error);
        return null;
    }
}
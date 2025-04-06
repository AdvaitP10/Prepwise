'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try{
        const userRecord = await db.collection("users").doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists"
            };
        }

        await db.collection("users").doc(uid).set({
            name,
            email
        });

        return {
            success: true,
            message: "Account Created Successfully. Please sign in"
        };

    } catch (error: any) {
        console.error('Error signing up:', error);

        if(error.code === "auth/email-already-exists"){
            return{
                success: false,
                message: "Email already exists"
            }
        }

        return {
            success: false,
            message: "Error signing up"
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try{
        const userRecord = await auth.getUserByEmail(email);
        
        if(!userRecord){
            return {
                success: false,
                message: "User does not exist. Create an account"
            }
        }

        await setSessionCookie(idToken);
    }catch(error: any){
        console.error('Error signing in:', error);

        return {
            success: false,
            message: "Failed to log into the account"
        }
    }
}

export async function setSessionCookie(idTokens: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idTokens, {
        expiresIn: 60 * 60 * 24 * 5 * 1000
    })

    cookieStore.set("session", sessionCookie, {
        maxAge: 60 * 60 * 24 * 5,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax"
    })
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value || null;

    if(!sessionCookie) {
        return null;
    }
    
    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

        if (!userRecord.exists) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;

    } catch(error){
        console.log(error);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();

    return !!user;
}
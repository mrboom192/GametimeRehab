import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "../hooks/useStorageState";
import firestore from "@react-native-firebase/firestore";
import { FirebaseError } from "firebase/app";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  session: null,
  isLoading: false,
});
// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  async function signUp(email: string, password: string, userData: any) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      await firestore()
        .collection("users")
        .doc(user.uid)
        .set({ uid: user.uid, ...userData }); // Create the uid manually

      setSession(user.uid); // Save the new user ID or token to the session
      router.replace("/welcome"); // Navigate to a welcome page or dashboard
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      // Save the user UID or token to session state
      setSession(user.uid); // Or user.email or user.getIdToken() for token
      router.replace("/");
    } catch (error) {
      console.error("Error signing in:", error);
      throw error; // Re-throw to handle errors in the UI
    }
  }

  async function signOut() {
    try {
      await auth().signOut();
      setSession(null); // Clear the session
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signOut, session, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

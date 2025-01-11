import { usePathname, useRouter, useSegments } from "expo-router"; // Ensure these are correctly imported
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Define types for user information (user context)
interface UserContextType {
  userInfo: any | null; // Can be null if user info is not available
  setUserInfo: React.Dispatch<React.SetStateAction<any | null>>; // Function to update the user info
  loading: boolean; // To track if user data is being fetched
  error: string | null; // To track any errors in fetching user data
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  // On authentication state change (user sign-in/sign-out)
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Cleanup on unmount
  }, []);

  // Fetch user info if user is authenticated
  useEffect(() => {
    if (user) {
      getUserInfo();
    }
  }, [user]);

  const getUserInfo = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const userDoc = await firestore()
        .collection("users")
        .doc(user?.uid) // Use UID to get the correct user document
        .get();

      if (userDoc.exists) {
        setUserInfo(userDoc.data() as any); // Ensure data is correctly typed
      } else {
        setUserInfo(null);
        setError("No user information found.");
      }
    } catch (e: any) {
      console.error("Error retrieving user information:", e.message);
      setError("Error retrieving user information.");
    } finally {
      setLoading(false);
    }
  };

  // Handle routing based on user state and info
  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(auth)"; // Check if current path is within the auth group

    if (user && !inAuthGroup) {
      // Redirect based on user role after authentication
      if (userInfo?.type === "athlete") {
        router.replace("/(auth)/home");
      } else if (userInfo?.type === "trainer") {
        router.replace("/(auth)/progress");
      }
    } else if (!user && inAuthGroup) {
      router.replace("/"); // Redirect to the login/signup screen if not authenticated
    }
  }, [user, initializing, userInfo, segments, router]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to access user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

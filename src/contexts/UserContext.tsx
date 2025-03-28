import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types for user information (user context)
interface UserContextType {
  data: any | null; // Can be null if user info is not available
  setData: React.Dispatch<React.SetStateAction<any | null>>; // Function to update the user info
  loading: boolean; // To track if user data is being fetched
  initializing: boolean;
  error: string | null; // To track any errors in fetching user data
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // On authentication state change (user sign-in/sign-out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged", user);
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
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
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setData(userDoc.data()); // Ensure data is correctly typed
      } else {
        setData(null);
        setError("No user information found.");
      }
    } catch (e: any) {
      console.error("Error retrieving user information:", e.message);
      setError("Error retrieving user information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ data, setData, initializing, loading, error }}
    >
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

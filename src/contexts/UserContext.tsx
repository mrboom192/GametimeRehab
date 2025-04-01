import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserContextType {
  data: any | null;
  // setData: React.Dispatch<React.SetStateAction<any | null>>;
  loading: boolean;
  initializing: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time user doc subscription
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ uid: user.uid, ...snapshot.data() });
        } else {
          setData(null);
          setError("No user document found.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to user doc:", error.message);
        setError("Error retrieving user information.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <UserContext.Provider value={{ data, initializing, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

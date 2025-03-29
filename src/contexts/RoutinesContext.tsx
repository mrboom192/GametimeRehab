import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { Routine } from "../types/utils";

interface RoutinesContextType {
  routines: Routine[];
  setRoutines: React.Dispatch<React.SetStateAction<Routine[]>>;
  loading: boolean;
  refetchRoutines: () => void;
}

const RoutinesContext = createContext<RoutinesContextType | undefined>(
  undefined
);

export const RoutinesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uid, setUid] = useState<string | null>(null);

  const fetchRoutines = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "routines"),
        where("assigneeIds", "array-contains", userId)
      );

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Routine[];

      setRoutines(docs);
    } catch (error) {
      console.error("Error fetching routines:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetchRoutines = useCallback(() => {
    if (uid) {
      fetchRoutines(uid);
    }
  }, [uid, fetchRoutines]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setUid(user.uid);
        fetchRoutines(user.uid);
      } else {
        setUid(null);
        setRoutines([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchRoutines]);

  return (
    <RoutinesContext.Provider
      value={{ routines, setRoutines, loading, refetchRoutines }}
    >
      {children}
    </RoutinesContext.Provider>
  );
};

export const useRoutines = (): RoutinesContextType => {
  const context = useContext(RoutinesContext);
  if (!context) {
    throw new Error("useRoutines must be used within a RoutinesProvider");
  }
  return context;
};

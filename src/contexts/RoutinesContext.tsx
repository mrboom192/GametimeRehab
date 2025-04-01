import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { Routine } from "../types/utils";

interface RoutinesContextType {
  routines: Routine[];
  loading: boolean;
}

const RoutinesContext = createContext<RoutinesContextType | undefined>(
  undefined
);

export const RoutinesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const unsubscribeRef = useRef<(() => void) | null>(null); // ✅ useRef instead of useState

  const startRoutineListener = useCallback((userId: string) => {
    setLoading(true);

    const q = query(
      collection(db, "routines"),
      where("assigneeIds", "array-contains", userId)
    );

    const unsubscribeFn = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Routine[];
        setRoutines(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to routines:", error);
        setLoading(false);
      }
    );

    // Save unsubscribe function without triggering re-renders
    unsubscribeRef.current = unsubscribeFn;
  }, []);

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        startRoutineListener(user.uid);
      } else {
        setRoutines([]);
        setLoading(false);
        unsubscribeRef.current?.();
      }
    });

    return () => {
      authUnsub();
      unsubscribeRef.current?.();
    };
  }, [startRoutineListener]);

  return (
    <RoutinesContext.Provider value={{ routines, loading }}>
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

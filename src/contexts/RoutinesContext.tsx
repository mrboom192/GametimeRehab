import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { Routine } from "../types/utils";
import { onAuthStateChanged } from "firebase/auth";

interface RoutinesContextType {
  routines: Routine[];
  setRoutines: React.Dispatch<React.SetStateAction<Routine[]>>;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const fetchRoutines = async () => {
        try {
          const q = query(
            collection(db, "routines"),
            where("assigneeIds", "array-contains", user.uid)
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
      };

      fetchRoutines();
    });

    return () => unsubscribe();
  }, []);

  return (
    <RoutinesContext.Provider value={{ routines, setRoutines, loading }}>
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

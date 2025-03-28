import { FieldValue, Timestamp } from "firebase/firestore";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Exercise } from "../types/utils";

export interface RoutineSession {
  sessionId: string;
  currentIndex: number;
  timeElapsed: number;
  startedAt: Timestamp | FieldValue;
  endedAt: Timestamp | FieldValue;
  completed: boolean;
  feedback: {
    [index: number]: {
      difficulty: "easy" | "just-right" | "hard";
      repRange: "less" | "assigned" | "more";
    };
  };

  // Below is data about the routine itself
  routineId: string;
  assigneeIds: string[];
  assignees: any[];
  assigner: any;
  createdAt: Timestamp | FieldValue;
  exercises: Exercise[];
  image: string;
  name: string;
}

interface RoutineContextType {
  routineSession: RoutineSession | null;
  setRoutineSession: React.Dispatch<
    React.SetStateAction<RoutineSession | null>
  >;
}

const RoutineSessionContext = createContext<RoutineContextType | undefined>(
  undefined
);

export const RoutineSessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [routineSession, setRoutineSession] = useState<RoutineSession | null>(
    null
  );

  return (
    <RoutineSessionContext.Provider
      value={{ routineSession, setRoutineSession }}
    >
      {children}
    </RoutineSessionContext.Provider>
  );
};

export const useRoutineSession = (): RoutineContextType => {
  const context = useContext(RoutineSessionContext);
  if (!context) {
    throw new Error("useRoutine must be used within a RoutineSessionProvider!");
  }
  return context;
};

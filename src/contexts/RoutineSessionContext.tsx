import React, { createContext, useState, useContext, ReactNode } from "react";

export interface RoutineSession {
  sessionId: string;
  routine: any;
  currentIndex: number;
  timeElapsed: number;
  startedAt: number;
  completed: boolean;
  feedback?: {
    [index: number]: {
      difficulty: "easy" | "just-right" | "hard";
      repRange: "less" | "assigned" | "more";
    };
  };
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

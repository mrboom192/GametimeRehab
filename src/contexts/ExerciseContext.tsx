// context/ExerciseContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Exercise } from "../types/utils";

interface ExerciseContextType {
  exercise: Exercise | null;
  setExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

export const ExerciseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);

  return (
    <ExerciseContext.Provider value={{ exercise, setExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};

// Custom hook for easy access
export const useExercise = (): ExerciseContextType => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercise must be used within an ExerciseProvider");
  }
  return context;
};

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type MeasurementSystem = "metric" | "imperial";
type UserType = "athlete" | "trainer" | "";
type Genders = "male" | "female" | "";

interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  confirm_password: string;
  type: UserType;
  institution_code: string;
  sport: string;
  position: string;
  system_of_measurement: MeasurementSystem;
  gender?: Genders;
  weight_value?: string;
  height_feet?: string;
  height_inches?: string;
  height_cm?: string;
  athlete_count?: string;
  athlete_past_injuries?: string;
  athlete_motivation?: string;
  athlete_challenges?: string[];
  athlete_injuries_impact_frequency?: string;
  trainer_challenges?: string[];
  trainer_interested_in_gamification?: string;
  trainer_communication_styles?: string[];
  trainer_update_frequency?: string;
}

// Define the context type
interface SignupContextType {
  signupData: SignupData;
  updateSignupData: (field: keyof SignupData, value: any) => void;
}

// Create the context
const SignupContext = createContext<SignupContextType | null>(null);

// Define the provider's props
interface SignupProviderProps {
  children: ReactNode;
}

// Create the provider
export const SignupProvider: React.FC<SignupProviderProps> = ({ children }) => {
  const [signupData, setSignupData] = useState<SignupData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    confirm_password: "",
    type: "",
    institution_code: "",
    sport: "",
    position: "",
    weight_value: "",
    height_feet: "",
    height_inches: "",
    height_cm: "",
    system_of_measurement: "metric",
    athlete_count: "",
    athlete_past_injuries: "", // aq1
    athlete_motivation: "", // aq2
    athlete_challenges: [], // aq3
    athlete_injuries_impact_frequency: "", // aq4
    trainer_challenges: [], // tq1
    trainer_interested_in_gamification: "",
    trainer_communication_styles: [],
    trainer_update_frequency: "",
  });

  const updateSignupData = (field: keyof SignupData, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};

// Hook to access the signup context
export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};

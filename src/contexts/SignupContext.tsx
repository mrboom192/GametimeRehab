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
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  type: UserType;
  institutionCode: string;
  sport: string;
  gender: Genders;
  position: string;
  weight_value: string; // Weight can be in kg or lbs
  height_feet?: string; // Only used for imperial
  height_inches?: string; // Only used for imperial
  height_cm?: string; // Only used for metric
  system_of_measurement: MeasurementSystem;
  athleteCount?: string;
}

// Define the context type
interface SignupContextType {
  signupData: SignupData;
  updateSignupData: (field: keyof SignupData, value: string) => void;
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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    confirmPassword: "",
    type: "",
    institutionCode: "",
    sport: "",
    position: "",
    weight_value: "",
    height_feet: "",
    height_inches: "",
    height_cm: "",
    system_of_measurement: "metric",
    athleteCount: "",
  });

  const updateSignupData = (field: keyof SignupData, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log(signupData);
  }, [signupData]);

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

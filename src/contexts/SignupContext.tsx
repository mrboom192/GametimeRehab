import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of the signup data
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
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
    confirmPassword: "",
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

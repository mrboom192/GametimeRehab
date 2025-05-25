import React, { createContext, useState, useContext, ReactNode } from "react";
import { Exercise } from "../types/utils";

// Define the shape of your cart
interface CartData {
  exercises: Exercise[];
  routineName: string;
  assignees: {
    uid: string;
    firstName: string;
    lastName: string;
    image: string;
  }[];
  assigneeIds: string[];
}

interface CartContextType {
  cart: CartData;
  setCart: React.Dispatch<React.SetStateAction<CartData>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartData>({
    exercises: [],
    routineName: "",
    assignees: [],
    assigneeIds: [],
  });

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

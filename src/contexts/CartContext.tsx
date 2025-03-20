import React, { createContext, useState, useContext, ReactNode } from "react";
import { Exercise } from "../types/utils";

// Define the context type
interface CartContextType {
  cart: Exercise[];
  setCart: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

// Create the context with an initial value of `undefined`
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

// Cart Provider Component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Exercise[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

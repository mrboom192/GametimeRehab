import React, { createContext, useRef, useContext } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const ConfettiContext = createContext<{
  playConfetti: () => void;
} | null>(null);

export const ConfettiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const confettiRef = useRef<LottieView>(null);

  const playConfetti = () => {
    confettiRef.current?.play?.();
  };

  return (
    <ConfettiContext.Provider value={{ playConfetti }}>
      <View style={{ flex: 1 }}>
        {children}
        <LottieView
          ref={confettiRef}
          source={require("@/assets/confetti.json")}
          loop={false}
          autoPlay={false}
          speed={1}
          progress={0.999} // Used to hide to confetti for this particular lottie
          style={{
            position: "absolute",
            top: -50,
            left: -50,
            right: -50,
            bottom: -50,
            zIndex: 9999,
            elevation: 9999,
            pointerEvents: "none",
          }}
        />
      </View>
    </ConfettiContext.Provider>
  );
};

export const useConfetti = () => {
  const context = useContext(ConfettiContext);
  if (!context)
    throw new Error("useConfetti must be used within a ConfettiProvider");
  return context;
};

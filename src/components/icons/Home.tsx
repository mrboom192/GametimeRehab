import React from "react";
import { Svg, Path } from "react-native-svg";

interface IconProps {
  color: string;
}

const Home: React.FC<IconProps> = ({ color = "#FFF" }) => {
  return (
    <Svg width="41" height="40" viewBox="0 0 41 40" fill="none">
      <Path
        d="M17.9 28.5V19.5H23.3V28.5M12.5 16.8L20.6 10.5L28.7 16.8V26.7C28.7 27.1774 28.5104 27.6352 28.1728 27.9728C27.8352 28.3104 27.3774 28.5 26.9 28.5H14.3C13.8226 28.5 13.3648 28.3104 13.0272 27.9728C12.6896 27.6352 12.5 27.1774 12.5 26.7V16.8Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Home;

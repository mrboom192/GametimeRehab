import React from "react";
import { Svg, Path } from "react-native-svg";

interface IconProps {
  color: string;
}

const BarChartIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.2002 12.8V11.2M8.0002 12.8V7.20001M12.8002 12.8V3.20001"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BarChartIcon;

export interface IconProps {
  color: string;
  size: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  image_light: string;
  image_dark: string;
  category: string;
  tags: string[];
}

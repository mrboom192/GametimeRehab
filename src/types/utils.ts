import { Timestamp } from "firebase/firestore";

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

export interface Routine {
  id: string;
  assigneeIds: string[];
  assignees: any[]; // An array of people assigned to the routine
  assigner: any; // Can only have 1 person assigning
  assignerId: string; // Can only have 1 person assigning
  image: string;
  name: string;
  exercises: Exercise[];
  createdAt: Timestamp;
}

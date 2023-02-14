import { PriorityInterface } from "./priority.interface";
import { CategoryInterface } from "./category.interface";

export interface TaskInterface {
  id: number;
  title: string;
  completed: boolean;
  priority?: PriorityInterface;
  category?: CategoryInterface;
  date?: Date;
}

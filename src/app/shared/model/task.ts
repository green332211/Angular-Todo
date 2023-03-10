import { PriorityInterface } from "../interfaces/priority.interface";
import { CategoryInterface } from "../interfaces/category.interface";

export class Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: PriorityInterface;
  category?: CategoryInterface;
  date?: Date;

  constructor(id: number, title: string, completed: boolean, priority?: PriorityInterface, category?: CategoryInterface, date?: Date) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.date = date;
  }
}

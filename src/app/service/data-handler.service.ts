import { Injectable } from '@angular/core';
import { Category } from "../model/Category";
import { TestData } from "../data/TestData";
import { Task } from "../model/Task";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  public getCategories(): Category[] {
    return TestData.categories;
  }

  public getTasks(): Task[] {
    return TestData.tasks;
  }

  public getTasksByCategory(category: Category): Task[] {
    const tasks = TestData.tasks.filter((task) => task.category === category);
    console.log(tasks);
    return tasks;
  }
}

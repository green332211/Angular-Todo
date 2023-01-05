import { Injectable } from '@angular/core';
import { Category } from "../model/Category";
import { TestData } from "../data/TestData";
import { Task } from "../model/Task";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  public tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  public categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() { }

  public fillTasks(): void {
    this.tasksSubject.next(TestData.tasks);
  }

  public fillTasksByCategory(category: Category): void {
    const tasks = TestData.tasks.filter((task) => task.category === category);
    this.tasksSubject.next(tasks);
  }
}

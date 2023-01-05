import { Injectable } from '@angular/core';
import { Category } from "../model/Category";
import { TestData } from "../data/TestData";
import { Task } from "../model/Task";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  public tasksSubject = new Subject<Task[]>()

  constructor() { }

  public getCategories(): Category[] {
    return TestData.categories;
  }

  public fillTasks(): void {
    this.tasksSubject.next(TestData.tasks);
  }

  public fillTasksByCategory(category: Category): void {
    const tasks = TestData.tasks.filter((task) => task.category === category);
    this.tasksSubject.next(tasks);
  }
}

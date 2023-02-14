import { Injectable } from '@angular/core';
import { TestData } from "../../data/TestData";
import { BehaviorSubject, Observable } from "rxjs";
import { CategoryInterface } from "../interfaces/category.interface";
import { TaskInterface } from "../interfaces/task.interface";
import { TaskDAOArray } from "../../data/dao/impl/taskDAOArray";
import { CategoryDAOArray } from "../../data/dao/impl/categoryDAOArray";
import { PriorityInterface } from "../interfaces/priority.interface";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  public tasksSubject = new BehaviorSubject<TaskInterface[]>(TestData.tasks);
  public categoriesSubject = new BehaviorSubject<CategoryInterface[]>(TestData.categories);
  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();

  constructor() {
    // this.fillTasks();
  }

  public fillTasks(): void {
    this.tasksSubject.next(TestData.tasks);
  }

  public fillTasksByCategory(category: CategoryInterface): void {
    const tasks = TestData.tasks.filter((task) => task.category === category);
    this.tasksSubject.next(tasks);
  }

  public getAllTasks(): Observable<TaskInterface[]> {
    return this.taskDaoArray.getAll();
  }

  public getAllCategories(): Observable<CategoryInterface[]> {
    return this.categoryDaoArray.getAll();
  }

  public searchTasks(
    category: CategoryInterface,
    searchText: string,
    status: boolean,
    priority: PriorityInterface
  ): Observable<TaskInterface[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
}

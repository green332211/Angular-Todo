import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryInterface } from "../interfaces/category.interface";
import { TaskInterface } from "../interfaces/task.interface";
import { TaskDAOArray } from "../../data/dao/impl/taskDAOArray";
import { CategoryDAOArray } from "../../data/dao/impl/categoryDAOArray";
import { PriorityInterface } from "../interfaces/priority.interface";
import { PriorityDAOArray } from "../../data/dao/impl/priorityDAOArray";
import { Category } from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();
  private priorityDaoArray = new PriorityDAOArray();

  constructor() {
  }

  public getAllTasks(): Observable<TaskInterface[]> {
    return this.taskDaoArray.getAll();
  }

  public updateTask(task: TaskInterface): Observable<TaskInterface> {
    return this.taskDaoArray.update(task);
  }

  public getAllCategories(): Observable<CategoryInterface[]> {
    return this.categoryDaoArray.getAll();
  }

  public getAllPriorities(): Observable<PriorityInterface[]> {
    return this.priorityDaoArray.getAll();
  }

  public searchTasks(
    category: CategoryInterface,
    searchText: string,
    status: boolean,
    priority: PriorityInterface
  ): Observable<TaskInterface[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  public deleteTask(id: number): Observable<TaskInterface> {
    return this.taskDaoArray.delete(id);
  }

  public updateCategory(category: CategoryInterface): Observable<CategoryInterface> {
    return this.categoryDaoArray.update(category);
  }

  public deleteCategory(id: number): Observable<CategoryInterface> {
    return this.categoryDaoArray.delete(id);
  }

  public addTask(task: TaskInterface): Observable<TaskInterface> {
    return this.taskDaoArray.add(task);
  }

  public addCategory(title: string): Observable<CategoryInterface> {
    return this.categoryDaoArray.add(new Category(null, title));
  }

  public searchCategories(title: string): Observable<CategoryInterface[]> {
    return this.categoryDaoArray.search(title);
  }

  public getCompetedCountInCategory(category: CategoryInterface): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  public getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }

  public getUncompletedCountInCategory(category: CategoryInterface): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  public getTotalCountInCategory(category: CategoryInterface): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

}

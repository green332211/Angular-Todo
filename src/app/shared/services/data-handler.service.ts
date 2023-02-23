import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryInterface } from "../interfaces/category.interface";
import { TaskInterface } from "../interfaces/task.interface";
import { TaskDAOArray } from "../../data/dao/impl/taskDAOArray";
import { CategoryDAOArray } from "../../data/dao/impl/categoryDAOArray";
import { PriorityInterface } from "../interfaces/priority.interface";
import { PriorityDAOArray } from "../../data/dao/impl/priorityDAOArray";

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
}

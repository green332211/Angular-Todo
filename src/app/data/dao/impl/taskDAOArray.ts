import { TaskDAO } from "../interfaces/taskDAO";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { PriorityInterface } from "../../../shared/interfaces/priority.interface";
import { TaskInterface } from "../../../shared/interfaces/task.interface";
import { Observable, of } from "rxjs";
import { TestData } from "../../TestData";

export class TaskDAOArray implements TaskDAO {
  public add(task: TaskInterface): Observable<TaskInterface> {
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask();
    }

    TestData.tasks.push(task);

    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map((task) => task.id)) + 1;
  }

  public delete(id: number): Observable<TaskInterface> {
    const taskTmp = TestData.tasks.find((task) => task.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

    return of(taskTmp);
  }

  public get(id: number): Observable<TaskInterface> {
    return of(TestData.tasks.find((todo) => todo.id === id));
  }

  public getAll(): Observable<TaskInterface[]> {
    return of(TestData.tasks);
  }

  public getCompletedCountInCategory(category: CategoryInterface): Observable<number> {
    return undefined;
  }

  public getTotalCount(): Observable<number> {
    return undefined;
  }

  public getTotalCountInCategory(category: CategoryInterface): Observable<number> {
    return undefined;
  }

  public getUncompletedCountInCategory(category: CategoryInterface): Observable<number> {
    return undefined;
  }

  public search(category: CategoryInterface, searchText: string, status: boolean, priority: PriorityInterface): Observable<TaskInterface[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(
    category: CategoryInterface,
    searchText: string,
    status: boolean,
    priority: PriorityInterface
  ): TaskInterface[] {
    let allTasks = TestData.tasks;

    if (category != null) {
      allTasks = allTasks.filter((task) => task.category === category);
    }

    if (searchText != null) {
      allTasks = allTasks.filter((task) => task.title.toUpperCase().includes(searchText.toUpperCase()));
    }

    if (status != null) {
      allTasks = allTasks.filter((task) => task.completed === status);
    }

    if (priority != null) {
      allTasks = allTasks.filter((task) => task.priority === priority);
    }

    return allTasks;
  }

  public update(task: TaskInterface): Observable<TaskInterface> {
    const taskTmp = TestData.tasks.find((task) => task.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

    return of(task);
  }

}

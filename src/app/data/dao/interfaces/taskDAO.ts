import { CommonDAO } from "./commonDAO";
import { TaskInterface } from "../../../shared/interfaces/task.interface";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { PriorityInterface } from "../../../shared/interfaces/priority.interface";
import { Observable } from "rxjs";

export interface TaskDAO extends CommonDAO<TaskInterface> {
  search(
    category: CategoryInterface,
    searchText: string,
    status: boolean,
    priority: PriorityInterface
  ): Observable<TaskInterface[]>;

  getCompletedCountInCategory(category: CategoryInterface): Observable<number>;

  getUncompletedCountInCategory(category: CategoryInterface): Observable<number>;

  getTotalCountInCategory(category: CategoryInterface): Observable<number>;

  getTotalCount(): Observable<number>;
}

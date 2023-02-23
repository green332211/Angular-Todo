import { PriorityDAO } from "../interfaces/priorityDAO";
import { PriorityInterface } from "../../../shared/interfaces/priority.interface";
import { Observable, of } from "rxjs";
import { TestData } from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {
  public add(T): Observable<PriorityInterface> {
    return undefined;
  }

  public delete(id: number): Observable<PriorityInterface> {
    return undefined;
  }

  public get(id: number): Observable<PriorityInterface> {
    return undefined;
  }

  public getAll(): Observable<PriorityInterface[]> {
    return of(TestData.priorities);
  }

  public update(T): Observable<PriorityInterface> {
    return undefined;
  }

}

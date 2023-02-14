import { PriorityDAO } from "../interfaces/priorityDAO";
import { PriorityInterface } from "../../../shared/interfaces/priority.interface";
import { Observable } from "rxjs";

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
    return undefined;
  }

  public update(T): Observable<PriorityInterface> {
    return undefined;
  }

}

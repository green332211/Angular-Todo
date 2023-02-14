import { CategoryDAO } from "../interfaces/categoryDAO";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { Observable, of } from "rxjs";
import { TestData } from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  public add(T): Observable<CategoryInterface> {
    return undefined;
  }

  public delete(id: number): Observable<CategoryInterface> {
    return undefined;
  }

  public get(id: number): Observable<CategoryInterface> {
    return undefined;
  }

  public getAll(): Observable<CategoryInterface[]> {
    return of(TestData.categories);
  }

  public search(title: string): Observable<CategoryInterface[]> {
    return undefined;
  }

  public update(T): Observable<CategoryInterface> {
    return undefined;
  }

}

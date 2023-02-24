import { CategoryDAO } from "../interfaces/categoryDAO";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { Observable, of } from "rxjs";
import { TestData } from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  public add(T): Observable<CategoryInterface> {
    return undefined;
  }

  public delete(id: number): Observable<CategoryInterface> {
    TestData.tasks.forEach((task) => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });

    const tmpCategory = TestData.categories.find((t) => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);

    return of(tmpCategory);
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

  public update(category: CategoryInterface): Observable<CategoryInterface> {
    const tmpCategory = TestData.categories.find((t) => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

    return of(tmpCategory);
  }

}

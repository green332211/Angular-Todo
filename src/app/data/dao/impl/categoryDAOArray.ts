import { CategoryDAO } from "../interfaces/categoryDAO";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { Observable, of } from "rxjs";
import { TestData } from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  public add(category: CategoryInterface): Observable<CategoryInterface> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }

    TestData.categories.push(category);

    return of(category);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map((category) => category.id)) + 1;
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
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  public update(category: CategoryInterface): Observable<CategoryInterface> {
    const tmpCategory = TestData.categories.find((t) => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

    return of(tmpCategory);
  }

}

import { CommonDAO } from "./commonDAO";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { Observable } from "rxjs";

export interface CategoryDAO extends CommonDAO<CategoryInterface> {
  search(title: string): Observable<CategoryInterface[]>
}

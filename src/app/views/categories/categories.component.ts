import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from "../../service/data-handler.service";
import { Category } from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.categoriesSubject
      .subscribe(categories => this.categories = categories);
  }

  public showTasksByCategory(category: Category) {
    this.dataHandler.fillTasksByCategory(category);
  }
}

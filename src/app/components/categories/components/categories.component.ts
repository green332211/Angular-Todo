import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataHandlerService } from "../../../shared/service/data-handler.service";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() public categories: CategoryInterface[];
  @Output() selectCategory = new EventEmitter<CategoryInterface>();

  public selectedCategory: CategoryInterface;

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  ngOnInit(): void {

  }

  public showTasksByCategory(category: CategoryInterface): void {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }
}

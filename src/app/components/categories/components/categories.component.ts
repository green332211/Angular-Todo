import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataHandlerService } from "../../../shared/services/data-handler.service";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Output() selectCategory = new EventEmitter<CategoryInterface>();

  @Input() public categories: CategoryInterface[];
  @Input() public selectedCategory: CategoryInterface;

  constructor() { }

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

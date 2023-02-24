import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataHandlerService } from "../../../shared/services/data-handler.service";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import {
  EditCategoryDialogComponent
} from "../../../dialog/components/edit-category-dialog/edit-category-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Output() selectCategory = new EventEmitter<CategoryInterface>();
  @Output() deleteCategory = new EventEmitter<CategoryInterface>();
  @Output() updateCategory = new EventEmitter<CategoryInterface>();

  @Input() public categories: CategoryInterface[];
  @Input() public selectedCategory: CategoryInterface;

  public indexMouseMove: number;
  public showEditIconCategory: boolean;

  constructor(
    private readonly dataHandler: DataHandlerService,
    private readonly dialog: MatDialog,
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

  public showEditIcon(index: number): void {
    this.indexMouseMove = index;
  }

  public openEditDialog(category: CategoryInterface): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории'],
      width: '400px',
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result === 'delete') {
          this.deleteCategory.emit(category);
          return;
        }

        if (typeof (result) === 'string') {
          category.title = result as string;
          this.updateCategory.emit(category);
          return
        }
      });
  }
}

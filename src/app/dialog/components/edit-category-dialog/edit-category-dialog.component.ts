import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit{

  constructor(
    private readonly dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string],
    private dialog: MatDialog
  ) {}

  public dialogTitle: string;
  public categoryTitle: string;
  public canDelete: boolean = true;

  public ngOnInit() {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];

    if (!this.categoryTitle) {
      this.canDelete = false;
    }
  }

  public onConfirm(): void {
    this.dialogRef.close(this.categoryTitle);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"? (сами задачи не удаляются)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.dialogRef.close('delete');
        }
      });
  }
}

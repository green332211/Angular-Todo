import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DataHandlerService } from "../../../shared/services/data-handler.service";
import { TaskInterface } from "../../../shared/interfaces/task.interface";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { PriorityInterface } from "../../../shared/interfaces/priority.interface";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { OperType } from "../../oper-type";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {
  public dialogTitle: string;
  public task: TaskInterface;
  public categories: CategoryInterface[];
  public priorities: PriorityInterface[];
  public tmpTitle: string;
  public tmpCategory: CategoryInterface;
  public tmpPriority: PriorityInterface;
  public tmpDate: Date;
  private operType: OperType;


  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [TaskInterface, string, OperType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.getAllCategories();
    this.getAllPriorities();
  }

  public onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;

    this.dialogRef.close(this.task);
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  private getAllCategories(): void {
    this.dataHandler.getAllCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private getAllPriorities(): void {
    this.dataHandler.getAllPriorities()
      .subscribe((priorities) => {
        this.priorities = priorities;
      });
  }

  public delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
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


  public activate() {
    this.dialogRef.close('activate');
  }

  public complete() {
    this.dialogRef.close('activate');
  }

  public canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  public canActivateDeactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}

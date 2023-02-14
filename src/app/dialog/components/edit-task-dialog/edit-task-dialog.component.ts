import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DataHandlerService } from "../../../shared/service/data-handler.service";
import { TaskInterface } from "../../../shared/interfaces/task.interface";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {
  public dialogTitle: string;
  public task: TaskInterface;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [TaskInterface, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

    console.log(this.task);
    console.log(this.dialogTitle);
  }

}

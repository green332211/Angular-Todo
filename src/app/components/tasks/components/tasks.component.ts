import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";

import { DataHandlerService } from "../../../shared/services/data-handler.service";
import { TaskInterface } from "../../../shared/interfaces/task.interface";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatDialog } from "@angular/material/dialog";
import { EditTaskDialogComponent } from "../../../dialog/components/edit-task-dialog/edit-task-dialog.component";
import { ConfirmDialogComponent } from "../../../dialog/components/confirm-dialog/confirm-dialog.component";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  @Output() public updateTask = new EventEmitter<TaskInterface>();
  @Output() public deleteTask = new EventEmitter<TaskInterface>();
  @Input('tasks') public set setTasks(tasks: TaskInterface[]) {
    this.tasks = tasks;
    this.fillTable();
  }
  @Output() public selectCategory = new EventEmitter<CategoryInterface>();

  // Ссылки на компоненты таблицы
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;

  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  public dataSource: MatTableDataSource<TaskInterface>; // контейнер - источник данных для таблицы
  public tasks: TaskInterface[];


  constructor(
    private dataHandler: DataHandlerService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tasks);

    this.fillTable();
  }

  public ngAfterViewInit(): void {
    this.addTableObjects();
  }

  public getPriorityColor(task: TaskInterface): string {
    if (task.completed) {
      return '#F8F9FA'
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }

  private fillTable(): void {
    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

    this.addTableObjects();

  }

  public announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openEditTaskDialog(task: TaskInterface): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Редактирование задачи'], autoFocus: false});

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result === 'complete') {
          task.completed = true;
          this.updateTask.emit(task);
        }

        if (result === 'activate') {
          task.completed = false;
          this.updateTask.emit(task);
          return;
        }

        if (result === 'delete') {
          this.deleteTask.emit(task);
          return;
        }

        if (result as TaskInterface) {
          this.updateTask.emit(task);
          return;
        }
      })
  }

  public openDeleteDialog(task: TaskInterface): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.title}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteTask.emit(task);
        }
      });
  }

  public onToggleStatus(task: TaskInterface): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  public onSelectCategory(category: CategoryInterface) {
    this.selectCategory.emit(category);
  }
}

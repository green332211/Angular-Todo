import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";

import { DataHandlerService } from "../../../shared/service/data-handler.service";
import { TaskInterface } from "../../../shared/interfaces/task.interface";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatDialog } from "@angular/material/dialog";
import { EditTaskDialogComponent } from "../../../dialog/components/edit-task-dialog/edit-task-dialog.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  // Ссылки на компоненты таблицы
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public dataSource: MatTableDataSource<TaskInterface>; // контейнер - источник данных для таблицы

  public tasks: TaskInterface[];
  @Input('tasks') public set setTasks(tasks: TaskInterface[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output() public updateTask = new EventEmitter<TaskInterface>();

  constructor(
    private dataHandler: DataHandlerService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
   /* this.dataHandler.getAllTasks()
      .subscribe((tasks) => this.tasks = tasks)*/

    this.dataSource = new MatTableDataSource(this.tasks);

    this.fillTable();
  }

  public ngAfterViewInit(): void {
    this.addTableObjects();
  }

  public toggleTaskCompleted(task: TaskInterface): void {
    task.completed = !task.completed;
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

  public onClickTask(task: TaskInterface): void {
    this.updateTask.emit(task);
  }

  public openEditTaskDialog(task: TaskInterface): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Редактирование задачи'], autoFocus: false});

    dialogRef.afterClosed()
      .subscribe()
  }
}

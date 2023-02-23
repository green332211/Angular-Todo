import { Component, OnInit } from '@angular/core';
import { TaskInterface } from "./shared/interfaces/task.interface";
import { DataHandlerService } from "./shared/services/data-handler.service";
import { CategoryInterface } from "./shared/interfaces/category.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Todo';
  public date: number;
  public tasks: TaskInterface[];
  public categories: CategoryInterface[];
  public selectedCategory: CategoryInterface;

  constructor(
    private dataHandler: DataHandlerService,
  ) {
  }

  public ngOnInit(): void {
    this.dataHandler.getAllTasks()
      .subscribe((tasks) => this.tasks = tasks);

    this.dataHandler.getAllCategories()
      .subscribe((categories) => this.categories = categories);
  }

  public onSelectCategory(category: CategoryInterface) {
    this.selectedCategory = category;

    this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
      .subscribe((tasks) => {
        this.tasks = tasks;
      })
  }

  public onUpdateTask(task: TaskInterface): void {
    this.dataHandler.updateTask(task)
      .subscribe(() => {
        this.dataHandler.searchTasks(
          this.selectedCategory,
          null,
          null,
          null
        )
          .subscribe((tasks) => {
            this.tasks = tasks;
          });
      });
  }

  public onDeleteTask(task: TaskInterface) {
    this.dataHandler.deleteTask(task.id)
      .subscribe(() => {
        this.dataHandler.searchTasks(
          this.selectedCategory,
          null,
          null,
          null
        )
          .subscribe((tasks) => {
            this.tasks = tasks;
          });
      });
  }
}

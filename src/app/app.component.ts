import { Component, OnInit } from '@angular/core';
import { TaskInterface } from "./shared/interfaces/task.interface";
import { DataHandlerService } from "./shared/services/data-handler.service";
import { CategoryInterface } from "./shared/interfaces/category.interface";
import { HttpClient } from "@angular/common/http";
import { PriorityInterface } from "./shared/interfaces/priority.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Todo';
  public date: Date = new Date();
  public tasks: TaskInterface[];
  public categories: CategoryInterface[];
  public priorities: PriorityInterface[];

  public selectedCategory: CategoryInterface = null;
  private searchTaskText: string = '';
  public searchCategoryText: string = '';
  public statusFilter: boolean;
  public priorityFilter: PriorityInterface;

  constructor(
    private dataHandler: DataHandlerService,
    private http: HttpClient
  ) {
    http.get('https://api.forum-auto.ru/v2/listGoods?login=493358_stroyzar&pass=sAVDkrEbqd&art=OC47')
      .subscribe((result) => {
        console.log(result);
      })
  }

  public ngOnInit(): void {
    this.dataHandler.getAllCategories()
      .subscribe((categories) => this.categories = categories);

    this.dataHandler.getAllPriorities()
      .subscribe((priorities) => {
        this.priorities = priorities;
      })

    this.onSelectCategory(null);
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

  public onDeleteTask(task: TaskInterface): void {
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

  public onSelectCategory(category: CategoryInterface): void {
    this.selectedCategory = category;

    this.updateTasks();
  }

  public onDeleteCategory(category: CategoryInterface): void {
    this.dataHandler.deleteCategory(category.id)
      .subscribe(() => {
        this.selectedCategory = null;
        this.onSearchCategory(this.searchCategoryText);
      })
  }

  public onUpdateCategory(category: CategoryInterface): void {
    this.dataHandler.updateCategory(category)
      .subscribe(() => {
        this.onSearchCategory(this.searchCategoryText);
      })
  }

  public onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  public onFilterTasksByPriority(priority: PriorityInterface): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  public onSearchTasks(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  private updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    )
      .subscribe((tasks: TaskInterface[]) => {
        this.tasks = tasks;
      })
  }

  public onAddTask(task: TaskInterface) {
    this.dataHandler.addTask(task)
      .subscribe(() => {
        this.updateTasks();
      })
  }

  public onAddCategory(title: string): void {
    this.dataHandler.addCategory(title)
      .subscribe(() => {
        this.updateCategories();
      });
  }

  private updateCategories(): void {
    this.dataHandler.getAllCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  public onSearchCategory(title: string): void {
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}

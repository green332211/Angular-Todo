import { Component, OnInit } from '@angular/core';
import { TaskInterface } from "./shared/interfaces/task.interface";
import { DataHandlerService } from "./shared/services/data-handler.service";
import { CategoryInterface } from "./shared/interfaces/category.interface";
import { HttpClient } from "@angular/common/http";
import { PriorityInterface } from "./shared/interfaces/priority.interface";
import { zip } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Todo';
  public tasks: TaskInterface[];
  public categories: CategoryInterface[];
  public priorities: PriorityInterface[];

  public selectedCategory: CategoryInterface = null;
  private searchTaskText: string = '';
  public searchCategoryText: string = '';
  public statusFilter: boolean;
  public priorityFilter: PriorityInterface;

  public totalTasksCountInCategory: number;
  public completedCountInCategory: number;
  public uncompletedCountInCategory: number;
  public uncompletedTotalTasksCount: number;

  public showStat = false;

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
        this.updateTasksAndStat();
      });
  }

  public onDeleteTask(task: TaskInterface): void {
    this.dataHandler.deleteTask(task.id)
      .subscribe(() => {
        this.updateTasksAndStat();
      });
  }

  public onSelectCategory(category: CategoryInterface): void {
    this.selectedCategory = category;

    this.updateTasksAndStat();
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
        this.updateTasksAndStat();
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

  private updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompetedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount()
    )
      .subscribe((array) => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3];
      })
  }

  public toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }
}

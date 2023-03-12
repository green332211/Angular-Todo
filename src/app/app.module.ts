import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { EditTaskDialogComponent } from './dialog/components/edit-task-dialog/edit-task-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ConfirmDialogComponent } from './dialog/components/confirm-dialog/confirm-dialog.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TaskDatePipe } from './shared/pipes/task-date.pipe';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EditCategoryDialogComponent } from './dialog/components/edit-category-dialog/edit-category-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutDialogComponent } from './dialog/components/about-dialog/about-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { StatisticsComponent } from './components/statistics/components/statistics/statistics.component';
import { StatisticsCardComponent } from './components/statistics/components/statistics-card/statistics-card.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditTaskDialogComponent,
    EditCategoryDialogComponent,
    FooterComponent,
    AboutDialogComponent,
    HeaderComponent,
    StatisticsComponent,
    StatisticsCardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

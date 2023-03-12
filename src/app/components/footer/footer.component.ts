import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AboutDialogComponent } from "../../dialog/components/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  public date: Date;
  public telegram: string = 'https://t.me/green3211';

  constructor(
    private dialog: MatDialog
  ) {
  }

  public ngOnInit() {
    this.date = new Date();
  }

  public openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, {
      autoFocus: false,
      data: {
        dialogTitle: 'О программе',
        message: 'Данное приложение создано для отработки навыков'
      },
      width: '400px'
    });
  }

}

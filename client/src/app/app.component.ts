import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//#region 8.80.1 Add implements OnInit and http ->app.html
export class AppComponent implements OnInit{
  title = 'Skinet';
  // 8.84.1 Dodati product interface ->pagination.ts


  constructor() {}

  // 8.84.3 Add IPagination ->
  ngOnInit(): void {
  }
}
//#endregion

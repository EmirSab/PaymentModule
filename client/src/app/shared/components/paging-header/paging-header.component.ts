import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {
//#region 9.101.2 Add properties for paging ->shared.module.ts
@Input() pageNumber: number;
@Input() pageSize: number;
@Input() totalCount: number;
//#endregion


  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  //#region  9.102.2 Add properties that are needed -> shop.html
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<number>();
  //#endregion
  constructor() { }

  ngOnInit(): void {
  }

  //9.102.2
  onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }

}

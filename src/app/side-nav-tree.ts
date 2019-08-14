import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

/** @title Fixed sidenav */
@Component({
  // selector: 'side-nav-tree',
  templateUrl: 'side-nav-tree.html',
  styleUrls: ['side-nav-tree.css'],
})
export class SideNavTree implements OnInit{

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  item: any;
  items: any;

  onItemSelect(item: any) {
    this.item = item;
  }
  onSelectAll(items: any) {
    this.items = items;
  }

  onItemDeSelect(item: any){
    // 
  }


  options: FormGroup;
  rightSideNav: string = '';

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 64
    });
  }

  shouldRun = true;

  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 2, color: 'lightpink' },
    { text: 'Two', cols: 3, rows: 2, color: 'lightgreen' }
  ];


}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
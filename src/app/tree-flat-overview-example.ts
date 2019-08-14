import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { isNull } from 'util';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {
            name: 'Broccoli',
            children: [
              { name: 'Broccoli 1' },
              { name: 'Broccoli 2' },
            ]
          },
          { name: 'Brussel sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
})
export class TreeFlatOverviewExample {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  displayOnView: any;

  /**
* Recursively expand all parents of the passed node.
*/
  expandParents(node: ExampleFlatNode, vehicleDataMap?: VehicleDataMap) {
    if(vehicleDataMap === undefined){
      vehicleDataMap = {};
    }

    const parent = this.getParent(node);

    // debug purpose
    // !(parent === null) ? console.log('Parent at level ' + JSON.stringify(parent.level) + ' is: ' + JSON.stringify(parent.name)): console.log('I am at root level');
    !(parent === null) ? (() => {
      vehicleDataMap[JSON.stringify(parent.level)] = parent.name;
      vehicleDataMap[JSON.stringify(node.level)] = node.name;
    })() : vehicleDataMap["0"] = node.name;

    this.treeControl.expand(parent);

    if (parent && parent.level > 0) {
      this.expandParents(parent, vehicleDataMap);
    }
    this.displayOnView = vehicleDataMap;
  }

  // private updateVehicleMap(parent: ExampleFlatNode, node: ExampleFlatNode) {
  //   vehicleDataMap[JSON.stringify(parent.level)] = parent.name;
  //   vehicleDataMap[JSON.stringify(node.level)] = node.name;
  // }

  /**
   * Iterate over each node in reverse order and return the first node that has a lower level than the passed node.
   */
  getParent(node: ExampleFlatNode): ExampleFlatNode | null {
    const { treeControl } = this;
    const currentLevel = treeControl.getLevel(node);
    // debug purpose
    // console.log(JSON.stringify(node.name) +' at level ' + JSON.stringify(node.level));

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = treeControl.dataNodes.indexOf(node) - 1;
    // console.log('Start index ' + JSON.stringify(startIndex));

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = treeControl.dataNodes[i];

      if (treeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }

}

class Hierarchy {
  public level: string;
  public name: string;
  constructor(level: string, name: string) {
    this.level = level;
    this.name = name;
  }
}

class VehicleDataMap {
  [level: string]: string;


  // constructor(levels: number) {
  //   this.levels = levels;
  // }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
import './polyfills';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

import { TreeFlatOverviewExample } from './app/tree-flat-overview-example';
import { SideNavTree } from './app/side-nav-tree';

const appRoutes: Routes = [
  { path: 'crisis-center', component: SideNavTree },
  { path: 'hero/:id', component: SideNavTree },
  {
    path: 'heroes',
    component: SideNavTree,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    component: SideNavTree
  },
  { path: '**', component: SideNavTree }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    NgMultiSelectDropDownModule.forRoot()
  ],
  // entryComponents: [SideNavTree],
  declarations: [SideNavTree,
    TreeFlatOverviewExample
  ],
  bootstrap: [SideNavTree],
  providers: []
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
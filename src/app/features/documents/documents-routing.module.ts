import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from "./document-detail/document-detail.component";
import {DocumentCreateComponent} from "./document-create/document-create.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DocumentListComponent },
      { path: 'detail/:id', component: DocumentDetailComponent },
      { path: 'create', component: DocumentCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentListComponent } from './document-list/document-list.component';
import {NgBytesPipeModule, NgKeysPipeModule, NgTemplatePipeModule} from "angular-pipes";
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {BackButtonDirective} from "../../shared/directives/back-button.directive";
import { DocumentCreateComponent } from './document-create/document-create.component';

@NgModule({
    imports: [
        CommonModule,
        DocumentsRoutingModule,
        SharedModule,
        NgBytesPipeModule,
        NgKeysPipeModule,
        NgTemplatePipeModule,
        NgxJsonViewerModule
    ],
    declarations: [
        DocumentListComponent,
        DocumentDetailComponent,
        BackButtonDirective,
        DocumentCreateComponent,
    ]
})
export class DocumentsModule { }

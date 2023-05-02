import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {NGXLogger} from 'ngx-logger';
import {Title} from '@angular/platform-browser';
import {ApiService} from "../../../core/services/api.service";
import {Router} from "@angular/router";
import {NavigationService} from "../../../core/services/navigation.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface Document {
  name: string;
  version: number;
  lengthInBytes: number;
}

export interface NestedDocument {
  name: string;
  documents: Document[]
}

const DOCS: NestedDocument[] = [];

@Component({
  selector: 'app-customer-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DocumentListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'version',
    'length',
    'delete',
  ];
  dataSource = new MatTableDataSource(DOCS);
  expandedElement: {} | null = null;
  // @ts-ignore
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  // @ts-ignore
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Document>>;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  private limitToConcatenate = 1;

  constructor(
    private apiService: ApiService,
    private logger: NGXLogger,
    private router: Router,
    public navigation: NavigationService,
    private cd: ChangeDetectorRef,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.apiService.getDocuments().subscribe((documents) => {
      let nestedDoc: {name: string, documents: any[]};
      let listOfNestedDocs: any[] = [];
      documents?.forEach((doc, index) => {
        if(!nestedDoc){
          nestedDoc = {name: doc.name, documents: []}
        }

        if(doc.name !== nestedDoc.name){
          listOfNestedDocs.push(nestedDoc);
          nestedDoc = {...{name: doc.name, documents: []}}
        }
        nestedDoc.documents.push(doc);
        if( index === documents.length -1 ){
          listOfNestedDocs.push(nestedDoc);
        }
      });
      console.log(`listOfNestedDocs:`, listOfNestedDocs);
      this.dataSource.data = listOfNestedDocs;
    })
    this.titleService.setTitle('Documents');
    this.dataSource.sort = this.sort;
  }

  toggleRow(element: any) {
    element.documents && element.documents?.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    // @ts-ignore

    this.cd.detectChanges();

    console.log(`Array.from(temp1):`, Array.from(this.innerTables));
    console.log(`this.innerTables:`, this.innerTables);

    // @ts-ignore
    this.innerTables?.forEach((table, index) => {
      // @ts-ignore
      (table.dataSource as MatTableDataSource<Document>).sort = {...this.innerSort.toArray()[index]}
    });
  }

  detailDocument(row: Document) {
    console.log(`row:`, row);

    this.router.navigate(['/documents/detail/'+row.name+'_'+row.version, ])
  }

  concatChildRaws(element: NestedDocument, column: string) {
    let concatenated = '';

    for(let i = 0; i <= element.documents.length ;i++){

      let doc = element.documents[i];

      if( i === this.limitToConcatenate && i < element?.documents.length - 1 ){
        // @ts-ignore
        concatenated += doc[column] + '...';
        break;
      }
      // last element, no comma
      if( i === element?.documents.length - 1 ){
        // @ts-ignore
        concatenated += doc[column] + '';
        break;
      }
      // @ts-ignore
      concatenated += doc[column] + ', ';
    }

    return concatenated;
  }

  delete(element: Document) {
    console.log(`element:`, );
  }
}

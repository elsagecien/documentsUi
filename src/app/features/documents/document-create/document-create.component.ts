import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../../core/services/notification.service";
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {
  private fileName: string = '';
  // @ts-ignore
  public file: FormData;

  constructor(private api: ApiService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onFileSelected($event: any) {
    // @ts-ignore
    const file:File = $event?.target?.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append(this.fileName, file);

      this.file = formData;
    }
  }

  upload(){
    this.api.create(this.file).subscribe((value) => {
      if (value){
        this.notificationService.openSnackBar('Uploaded Successfully')
      }
    });

  }
}

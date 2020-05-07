import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../_services/user.service';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {TokenStorageService} from "../../../_services/token-storage.service";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files  = [];

  BASE_URL = environment.BASE_URL;
  products = [];
  userId: any;
  constructor(private userService: UserService,
              private storageService: TokenStorageService) {
    this.userId = this.storageService.getUser().id;
  }

  ngOnInit() {
    this.initAll();
  }

  initAll() {
    this.getProducts();
  }

  getProducts() {
    this.userService.getProducts(this.userId).subscribe(res => {
      this.products = res.products;
    })
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('id', this.userId);
    file.inProgress = true;
    // Upload image to server.
    this.userService.createProduct(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        if(event.body) {
          this.getProducts();
          file.inProgress = false;
          file.progress = 0;
        }
      }
    });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }


  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      // for (let index = 0; index < fileUpload.files.length; index++)
      for (const f of fileUpload.files) {
        const file = f;
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }


}

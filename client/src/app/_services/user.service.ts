import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }


  createProduct(formData) {
    return this.http.post<any>(API_URL + 'create-product', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getProducts(userId) {
    const params = new HttpParams().set('userID',  userId);
    return this.http.get<any>(API_URL + 'get-product', {params});
  }

  getImageData(imageName) {
    const params = new HttpParams().set('imageName', imageName);
    return this.http.get<any>(API_URL + 'get-image-data', {params});
  }

}

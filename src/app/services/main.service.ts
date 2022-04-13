import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnimalCategory, ServiceCategory } from '../models/navCategory.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  apiRoot = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  getNavList() {
    return this.http.get<AnimalCategory[]>(this.apiRoot + '/listnavcategory');
  }
  getServices(id: number) {
    return this.http.get<ServiceCategory[]>(
      this.apiRoot + `/listservicesbyid/${id}`
    );
  }
}

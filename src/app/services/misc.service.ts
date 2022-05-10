import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  contactMail(distributor) {
    console.log(distributor);

    return this.http.post(`${this.baseUrl}/distributer`, distributor);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  newsLetter(arg0: { email: any }) {
    throw new Error('Method not implemented.');
  }
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  contactMail(distributor) {
    console.log(distributor);

    return this.http.post(`${this.baseUrl}/distributer`, distributor);
  }

  newsletter(newsletter) {
    console.log(newsletter);

    return this.http.post(`${this.baseUrl}/addemail`, newsletter);
  }
}

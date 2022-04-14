import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  baseUrl = environment.apiBaseUrl;

  address$: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);

  constructor(private http: HttpClient) {}

  async getAddresses(userId: number) {
    const addresses = await this.http.get<Address[]>(`${this.baseUrl}/listaddressbycustomerid/${userId}`).toPromise(); // prettier-ignore
    this.address$.next(addresses);
  }

  getAddressByid(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/getaddressbyid/${id}`);
  }

  async addAddress(address: Address) {
    // console.log(address);
    await this.http.post(`${this.baseUrl}/createaddress`, address).toPromise();
    this.getAddresses(address.cust_id); // prettier-ignore
    return address;
  }

  async updateAddress(address: Address) {
    await this.http
      .put<void>(`${this.baseUrl}/updateaddress/${address.id}`, address)
      .toPromise(); // prettier-ignore
    this.getAddresses(address.cust_id); // prettier-ignore
    return address;
  }

  async deleteAddress(address: Address) {
    await this.http
      .delete<void>(`${this.baseUrl}/deleteaddress/${address.id}`)
      .toPromise(); // prettier-ignore
    this.getAddresses(address.cust_id);
    return address;
  }

  async setDefaultAddress(address: Address) {
    await this.http.post(`${this.baseUrl}/setdefaultaddress/${address.id}`, {cust_id: address.cust_id}).toPromise(); // prettier-ignore
    this.getAddresses(address.cust_id);
  }

  get coutries$() {
    return this.http.get<{ id: number; country: string }[]>(
      `${this.baseUrl}/listcountries`
    );
  }

  get states$() {
    return this.http.get<{ id: number; state: string }[]>(
      `${this.baseUrl}/liststates`
    );
  }

  get addressType$() {
    return this.http.get<{ id: number; type: string }[]>(
      `${this.baseUrl}/listaddresstype`
    );
  }
}

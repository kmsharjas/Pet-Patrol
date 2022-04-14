import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiBaseUrl;

  user$: BehaviorSubject<User | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getUser();
  }

  getUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.user$.next(user);
    return user;
  }

  // async verifyUser(user: User) {
  //   return await this.http
  //     .get(`${this.baseUrl}/tokenverification/`, {
  //       headers: { token: user.token },
  //     })
  //     .pipe(
  //       map((user) => {
  //         console.log(user);
  //         if (user && user['id']) return true;
  //         return false;
  //       })
  //     )
  //     .toPromise();
  // }

  setuser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
  }

  getOtp(mobile: string) {
    return this.http.post(`${this.baseUrl}/otpgeneration`, { mobile });
  }

  regOtp(jsn: any) {
    console.log(jsn);

    return this.http.post(`${this.baseUrl}/customerregister`, jsn);
  }

  async login(mobile: string, otp: string) {
    const { message, ...user } = await this.http
      .post<User & { message: string }>(`${this.baseUrl}/checkotp/${mobile}`, {
        otp,
      })
      .toPromise();

    if (message === 'otp is verified') this.setuser(user);
    return message;
  }

  async register(jsn) {
    console.log(jsn);

    const { message, ...user } = await this.http
      .post<User & { message: string }>(`${this.baseUrl}/checkregisterotp`, jsn)
      .toPromise();

    if (message === 'otp is verified') this.setuser(user);
    return message;
  }
  async updateUser(user: User, id: number) {
    try {
      const newUser = await this.http
        .put<User>(`${this.baseUrl}/updateregisteredusers/${id}`, user)
        .toPromise();
      this.setuser(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  getDefaultAddress(id: number) {
    return this.http
      .get<Address[]>(`${this.baseUrl}/getdefaultaddress/${id}`)
      .pipe(map((addresses) => addresses[0]));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart-item');
    this.user$.next(null);
  }
}

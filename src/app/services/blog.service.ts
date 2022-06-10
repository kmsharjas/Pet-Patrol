import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  getBlogs(limit?: number) {
    return this.http.get<Blog[]>(`${this.apiRoot}/listblogs`);
  }
  getBlog(id: number) {
    return this.http.get<Blog>(`${this.apiRoot}/listblogbyid/${id}`);
  }
}

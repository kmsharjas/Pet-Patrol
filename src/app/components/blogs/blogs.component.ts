import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  constructor(private blogservice: BlogService) {}

  ngOnInit(): void {
    this.blogs$ = this.blogservice.getBlogs();
    // this.blogs$.subscribe(console.log);
  }
}

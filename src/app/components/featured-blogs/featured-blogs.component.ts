import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-featured-blogs',
  templateUrl: './featured-blogs.component.html',
  styleUrls: ['./featured-blogs.component.css'],
})
export class FeaturedBlogsComponent implements OnInit {
  featuredBlogs$: Observable<Blog[]>;
  constructor(private blogservice: BlogService) {}

  ngOnInit(): void {
    this.featuredBlogs$ = this.blogservice.getBlogs();
  }
}

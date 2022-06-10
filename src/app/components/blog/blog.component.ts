import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blog$: Observable<Blog>;
  relatedBlogs$: Observable<Blog[]>;
  constructor(
    private blogservice: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blog$ = this.route.params.pipe(
      switchMap((params) => this.blogservice.getBlog(params['id']))
    );
    // this.blog$.subscribe(console.log);
    this.relatedBlogs$ = this.blogservice.getBlogs();
    // this.relatedBlogs$.subscribe(console.log);
    console.log(this.relatedBlogs$);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

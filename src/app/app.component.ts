import { Component, OnInit } from '@angular/core';

import { POST } from './models';
import { PostService } from './providers/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  posts: POST[] = []

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts = this.postService.getPosts()
    this.postService.getUpdatedPosts()
      .subscribe((res: POST[]) => this.posts = res);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/providers/post.service';
import { Subscription } from 'rxjs';

import { POST } from 'src/app/models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  
  posts: POST[] = []
  private postsSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPostsFromServer()
    this.postsSub = this.postService.getUpdatedPosts()
      .subscribe((res: POST[]) => this.posts = res);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

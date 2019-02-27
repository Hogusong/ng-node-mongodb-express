import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/providers/post.service';
import { Subscription } from 'rxjs';

import { POST } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  
  isLoading = false;
  posts: POST[] = []
  private postsSubscription: Subscription;

  constructor(private postService: PostService,
              private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.postService.getPostsFromServer()
      this.postsSubscription = this.postService.getUpdatedPosts()
        .subscribe((res: POST[]) => {
          this.posts = res;
        });
      this.isLoading = false;
    }, 2000);
  }

  onDelete(id: string, index: number) {
    this.postService.deletePost(id, index);
  }

  onEdit(postId: string) {
    this.router.navigate(['edit', postId]);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}

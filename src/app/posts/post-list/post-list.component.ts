import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/providers/post.service';
import { Subscription } from 'rxjs';

import { POST } from 'src/app/models';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  
  isLoading = false;
  posts: POST[] = []
  totalPost = 20;
  currPage = 1;
  postPerPage = 2;
  pageSizeOptions = [2, 5, 10, 20, 40]
  private postsSubscription: Subscription;

  constructor(private postService: PostService,
              private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.postService.getPostsFromServer(this.postPerPage, this.currPage++)
      this.postsSubscription = this.postService.getUpdatedPosts()
        .subscribe((res: POST[]) => {
          this.posts = res;
        });
      this.isLoading = false;
    }, 1000);
  }

  onDelete(id: string, index: number) {
    this.postService.deletePost(id, index);
  }

  onEdit(postId: string) {
    this.router.navigate(['edit', postId]);
  }

  onChangePage(pageData: PageEvent) {
    console.log(pageData);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}

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
  totalPosts = 0;
  currPage = 1;
  postPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10, 20, 40]
  private postsSubscription: Subscription;

  constructor(private postService: PostService,
              private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.initialLoad();
  }

  onDelete(id: string, index: number) {
    this.postService.deletePost(id).subscribe(res => {
      this.initialLoad();
    });
  }

  initialLoad() {
    setTimeout(() => {
      this.postService.getPostsFromServer(this.postPerPage, this.currPage)
      this.postsSubscription = this.postService.getUpdatedPosts()
        .subscribe((res: any) => {
          this.posts = res.posts;
          this.totalPosts = res.count;
        });
      this.isLoading = false;
    }, 500);
  }

  onEdit(postId: string) {
    this.router.navigate(['edit', postId]);
  }

  onChangePage(pageData: PageEvent) {
    this.currPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPostsFromServer(this.postPerPage, this.currPage)
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}

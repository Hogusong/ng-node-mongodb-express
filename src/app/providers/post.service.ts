import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { POST } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: POST[] = [];
  private updatedPosts = new Subject<POST[]>();

  constructor(private http: HttpClient) { }

  getPostsFromServer() {
    this.http.get<{message: string, posts: POST[]}>('http://localhost:3000/api/posts')
      .subscribe((data) => {
        this.posts = data.posts;
        this.updatedPosts.next([...this.posts]);
    });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: POST) {
    this.posts.push(post);
    this.updatedPosts.next(this.posts);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { POST } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private id: number;
  private posts: POST[] = [];
  private updatedPosts = new Subject<POST[]>();

  constructor(private http: HttpClient) { }

  getPostsFromServer() {
    this.http
      .get<{message: string, posts: POST[]}>('http://localhost:3000/api/posts')
      .subscribe((data) => {
        this.posts = data.posts;
        this.id = this.posts.length + 1;
        this.updatedPosts.next([...this.posts]);
    });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: POST) {
    post.id = '' + this.id;
    this.http
      .post<{ message: string }>('http://localhost:3000/api/post', post)
      .subscribe(data => {
        console.log(data.message);
        this.posts.push(post);
        this.id++
        this.updatedPosts.next(this.posts);
    });
  }
}

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
    this.http
      .get<{message: string, posts: POST[]}>('http://localhost:3000/api/posts')
      .subscribe((data) => {
        this.posts = data.posts;
        this.updatedPosts.next([...this.posts]);
    });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: POST) {
    this.http
      .post<{ message: string, id: string }>('http://localhost:3000/api/post', post)
      .subscribe(data => {
        post.id = data.id;
        this.posts.push(post);
        this.updatedPosts.next([...this.posts]);
    });
  }

  deletePost(id: string, index: number) {
    this.http
      .delete('http://localhost:3000/api/posts/' + id)
      .subscribe(res => {
        if (res === true) {
          this.posts.splice(index, 1);
          this.updatedPosts.next([...this.posts]);
        }
      });
  }
}

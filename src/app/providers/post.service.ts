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

  getPostById(postId: string) {
    return this.http.get<POST>('http://localhost:3000/api/posts/' + postId)
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: POST, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.http
      .post<{ message: string, id: string }>(
        'http://localhost:3000/api/posts/add',
        postData
      )
      .subscribe(data => {
        post.id = data.id;
        this.posts.push(post);
        this.updatedPosts.next([...this.posts]);
    });
  }

  updatePost(post: POST, image: File | string) {
    let postData : POST | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', post.id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
    } else {
      postData = post;
    }
    this.http
      .put('http://localhost:3000/api/posts/update', postData)
      .subscribe(res => {
        const index = this.posts.findIndex(p => p.id === post.id );
        if (index > -1) {
          this.posts[index] = post;
          this.updatedPosts.next([...this.posts]);
        }    
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

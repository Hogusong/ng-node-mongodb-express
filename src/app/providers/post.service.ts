import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { POST } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: POST[] = [];
  private updatedPosts = new Subject<any>();
  private count: number;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getPostsFromServer(pageSize, page) {
    const queryParams = '?pageSize=' + pageSize + '&page=' + page
    this.http
      .get<{message: string, posts: POST[], count: number}>(
        'http://localhost:3000/api/posts' + queryParams)
      .subscribe((data) => {
        this.posts = data.posts;
        this.count = data.count;
        this.updatedPosts.next({ posts: [...this.posts], count: this.count });
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
      .post<{ message: string, post: POST }>(
        'http://localhost:3000/api/posts/add',
        postData
      )
      .subscribe(data => {
        post = data.post;
        this.posts.push(post);
        this.updatedPosts.next({ posts: [...this.posts], count: ++this.count });
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
          this.updatedPosts.next({ posts: [...this.posts], count: this.count });
        }    
      });
  }

  deletePost(id: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + id);
  }
}

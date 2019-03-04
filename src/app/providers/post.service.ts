import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { POST } from '../models';
import { AuthService } from './auth.service';

const BACKEND_URL = environment.apiUrl + 'posts/';

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
        BACKEND_URL + queryParams)
      .subscribe((data) => {
        this.posts = data.posts;
        this.count = data.count;
        this.updatedPosts.next({ posts: [...this.posts], count: this.count });
    });
  }

  getPostById(postId: string) {
    return this.http.get<POST>(BACKEND_URL + postId)
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
        BACKEND_URL + 'add',
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
      .put(BACKEND_URL + 'update', postData)
      .subscribe(res => {
        const index = this.posts.findIndex(p => p.id === post.id );
        if (index > -1) {
          this.posts[index] = post;
          this.updatedPosts.next({ posts: [...this.posts], count: this.count });
        }    
      });
  }

  deletePost(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }
}

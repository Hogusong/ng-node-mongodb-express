import { Injectable } from '@angular/core';
import { POST } from '../models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: POST[] = [];
  private updatedPosts = new Subject<POST[]>();

  getPosts() {
    return [...this.posts];
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: POST) {
    this.posts.push(post);
    this.updatedPosts.next(this.posts);
  }
}

import { Component } from '@angular/core';

import { POST } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts: POST[] = []

  onSavePost(post: POST) {
    if (post) {  this.posts.push(post);  }
  }
}

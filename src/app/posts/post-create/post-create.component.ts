import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  @ViewChild('postForm') ngForm: NgForm;

  constructor(private postService: PostService) { }

  onAddPOst() {
    if (this.ngForm.invalid) {  return  }
    const newTitle = this.ngForm.value.title.trim();
    const newContent = this.ngForm.value.content.trim();
    if (newTitle.length > 2 && newContent.length > 0) {
      const post: POST = { title: newTitle, content: newContent };
      this.postService.addPost(post);
      this.ngForm.resetForm();
    }
  }
}
 
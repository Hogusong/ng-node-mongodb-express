import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mimeType } from './mine-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup;
  imagePreview: any;
  postId: string;
  post: POST = { title: '', content: '', imagePath: '' };

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,
        { validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null,  { validators: [Validators.required]}),
      image: new FormControl(null,
        { validators: [Validators.required],
          asyncValidators: [mimeType]})
    });

    this.postId = this.activatedRoute.snapshot.params['postId'];
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(res => {
        this.post = res;
        this.form.setValue({
          title: this.post.title,
          content: this.post.content,
          image: this.post.imagePath
        });
      });
    } 
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
 
  onSavePost() {
    if (this.form.invalid) {  return  }
    const newTitle = this.form.value.title.trim();
    const newContent = this.form.value.content.trim();
    if (newTitle.length > 2 && newContent.length > 0) {
      const post: POST = { title: newTitle, content: newContent, imagePath: this.form.value.image };
      if (!this.postId) {
        this.postService.addPost(post, this.form.value.image);
      } else {
        post.id = this.postId;
        this.postService.updatePost(post, this.form.value.image);
      }
    }
    this.form.reset();
    this.router.navigate(['/']);
  }
}

/*  used FormModule(NgForm)
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { POST } from 'src/app/models';
import { PostService } from 'src/app/providers/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postId: string;
  post: POST = { title: '', content: '' };

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.params['postId'];
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(res => this.post = res);
    } 
  }

  onSavePost(ngForm: NgForm) {
    if (ngForm.invalid) {  return  }
    const newTitle = ngForm.value.title.trim();
    const newContent = ngForm.value.content.trim();
    if (newTitle.length > 2 && newContent.length > 0) {
      const post: POST = { title: newTitle, content: newContent };
      if (!this.postId) {
        this.postService.addPost(post);
      } else {
        post.id = this.postId;
        this.postService.updatePost(post);
      }
    }
    this.router.navigate(['/']);
  }
}
*/
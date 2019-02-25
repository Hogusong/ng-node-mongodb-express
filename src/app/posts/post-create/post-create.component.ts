import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { POST } from 'src/app/models';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @ViewChild('postForm') ngForm: NgForm;
  @Output() onSavePost = new EventEmitter<POST>();

  constructor() { }

  ngOnInit() {
    this.initialize()
  }

  onAddPOst() {
    if (this.ngForm.invalid) {  return  }
    const newTitle = this.ngForm.value.title.trim();
    const newContent = this.ngForm.value.content.trim();
    if (newTitle.length > 3 && newContent.length > 0) {
      this.onSavePost.emit({ title: newTitle, content: newContent });
    } else {
      this.onSavePost.emit(null);
    }
    this.initialize();
  }

  initialize() {
    // this.ngForm.setValue({ title: '', content: '' });
  }
}
 
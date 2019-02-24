import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Output() onSavePost = new EventEmitter<any>();
  newTitle = '';
  newContent = '';

  constructor() { }

  ngOnInit() {
  }

  onAddPOst() {
    this.newTitle = this.newTitle.trim();
    this.newContent = this.newContent.trim();
    if (this.newTitle.length > 3 && this.newContent.length > 0) {
      this.onSavePost.emit({ title: this.newTitle, content: this.newContent });
    } else {
      this.onSavePost.emit(false);
    }
    this.newTitle = '';
    this.newContent = '';
  }
}
 
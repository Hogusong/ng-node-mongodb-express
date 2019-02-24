import { Component, OnInit, Input } from '@angular/core';

import { POST } from 'src/app/models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() posts: POST;

  constructor() { }
  ngOnInit() {
  }

}

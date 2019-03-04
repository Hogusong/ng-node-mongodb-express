import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { NgMaterialModule } from "../ng-material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule,
    RouterModule
  ]
})
export class PostsModule { }

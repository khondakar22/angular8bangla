import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model.';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  // @Output() postedCreated = new EventEmitter<Post>();
  constructor(public postService: PostsService) {}

  ngOnInit() {}

  // onAddPost(postInput: HTMLTextAreaElement) {
  //   this.newPost = postInput.value;
  // }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
     title: form.value.title,
     content: form.value.content,
   };
    // this.postedCreated.emit(post);
    this.postService.addPost(form.value.title, form.value.content);
  }
}

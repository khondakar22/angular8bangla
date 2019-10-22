import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model.';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // @Input() posts: Post[] = [ ];
     posts: Post[] = [ ];
     private postsSub: Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    this.postsService.getPosts();
    this.postsSub =  this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(posts);
    });
  }

  onDelete(postId: string): void {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}

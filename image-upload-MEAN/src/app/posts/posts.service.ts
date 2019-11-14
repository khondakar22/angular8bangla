import { Injectable } from '@angular/core';
import { Post } from './post.model.';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    // return [...this.posts];
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          });
        }),
      )
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  getPost(id: string) {
    // return { ...this.posts.find(p => p.id === id) };
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id,
    );
  }
  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: null, title, content };
    const postDate = new FormData();
    postDate.append('title', title);
    postDate.append('content', content);
    postDate.append('image', image, title);

    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postDate,
      )
      .subscribe(responseData => {
        const post: Post = {id: responseData.post.id, title, content, imagePath: responseData.post.imagePath};
        console.log(responseData.message);
        const id = responseData.post.id;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  updatePost(id: string, title: string, content: string, image: File | string) {
    // const post: Post = { id, title, content, imagePath: null };
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
       postData = new FormData();
       postData.append('title', title);
       postData.append('content', content);
       postData.append('image', image, title);
    } else {
      postData = {id, title, content, imagePath: image};
    }
    this.http
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(res => {
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex(p => p.id === id);
        const post: Post = {id, title, content, imagePath: res.imagePath};
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

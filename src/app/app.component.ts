import { Component } from '@angular/core';
import { Comment, User } from './class/chat';


const CURRENT_USER: User = new User(1, 'Tanaka Taro');
const ANOTHER_USER: User = new User(2, 'Suzuki Jiro');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'This is the first comment by Suzuki.'),
  new Comment(ANOTHER_USER, 'This is the second comment by Suzuki.'),
  new Comment(CURRENT_USER, 'This is the first comment by Tanaka.'),
  new Comment(ANOTHER_USER, 'This is the third comment by Suzuki.'),
  new Comment(CURRENT_USER, 'This is the first comment by Tanaka.'),
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  content = '';
  comments = COMMENTS;
  currentUser = CURRENT_USER;


  isCurrentUser(targetUid: number): boolean {
    return this.currentUser.uid === targetUid;
  }

  addComment(comment: string) {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
      this.content = '';
    }
  }
}

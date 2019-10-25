import { Component } from '@angular/core';
import { Comment, User } from './class/chat';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

const CURRENT_USER: User = new User(1, 'Tanaka Taro');
const ANOTHER_USER: User = new User(2, 'Suzuki Jiro');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  content = '';
  currentUser = CURRENT_USER;
  comments: Observable<Comment[]>;

  constructor(private db: AngularFirestore) {
    this.comments = db
      .collection('comments', ref => {
        return ref.orderBy('date', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          // return comment with date
          const data = action.payload.doc.data() as Comment;
          const commentData = new Comment(data.user, data.content);
          commentData.setData(data.date);
          return commentData;
        }))
      );
  }



  isCurrentUser(targetUid: number): boolean {
    return this.currentUser.uid === targetUid;
  }

  addComment(e: Event, comment: string) {
    e.preventDefault();
    if (comment) {
      this.db
        .collection('comments')
        .add(new Comment(this.currentUser, comment).desirialize());
      this.content = '';
    }
  }
}

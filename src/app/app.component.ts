import { Component, OnInit } from '@angular/core';
import { Comment, User } from './class/chat';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

const CURRENT_USER: User = new User(1, 'Tanaka Taro');
const ANOTHER_USER: User = new User(2, 'Suzuki Jiro');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  content = '';
  contentBeforeEdit = '';
  currentUser = CURRENT_USER;
  comments: Observable<Comment[]>;


  constructor(private db: AngularFirestore,
              private snakBar: MatSnackBar) {
    this.comments = db
      .collection('comments', ref => {
        return ref.orderBy('date', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          // return comment with date
          const data = action.payload.doc.data() as Comment;
          const key = action.payload.doc.id;
          const commentData = new Comment(data.user, data.content);
          commentData.setData(data.date, key);
          return commentData;
        }))
      );
  }

  ngOnInit() {
    document.getElementById('comment').focus();
  }



  isCurrentUser(targetUid: number): boolean {
    return this.currentUser.uid === targetUid;
  }

  addComment(e: Event, comment: string) {
    e.preventDefault();
    if (comment) {
      this.db
        .collection('comments')
        .add(new Comment(this.currentUser, comment).deserialize());
      this.content = '';
      document.getElementById('comment').focus();
    }
  }

  toggleEditFlag(comment: Comment) {
    comment.editFlag = !comment.editFlag;
    this.contentBeforeEdit = comment.content;
  }

  updateComment(comment: Comment) {
    this.db
      .collection('comments')
      .doc(comment.key)
      .update({
        content: comment.content,
        date: comment.date
      })
      .then(() => {
        this.openSnackBar('Successfully Updated a comment.', 'close');
        comment.editFlag = false;
      });
  }

  cancelEditComment(comment: Comment) {
    comment.editFlag = false;
    comment.content = this.contentBeforeEdit;
  }

  deleteComment(key: string) {
    const isDelete = confirm('Delete this comment?').valueOf();
    if (isDelete) {
      this.db.collection('comments')
        .doc(key)
        .delete()
        .then(() => {
          this.openSnackBar('Successfully Deleted a comment.', 'close');
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snakBar.open(message, action, {
      duration: 3000
    });
  }
}

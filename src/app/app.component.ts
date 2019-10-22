import { Component } from '@angular/core';
import { Comment } from './class/chat';


const COMMENTS: Comment[] = [
  { name: 'Suzuki Taro', content: 'This is comment 1.' },
  { name: 'Suzuki Taro', content: 'This is comment 2.' },
  { name: 'Suzuki Taro', content: 'This is comment 3.' },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public content = '';
  public comments = COMMENTS;

}

import { Component } from '@angular/core';
import { CoursesHttpPage } from './courses-http-page/courses-http-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesHttpPage],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'reactive-search-app';
}

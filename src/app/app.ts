import { Component } from '@angular/core';
import { CoursesPage } from './courses-page/courses-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesPage],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'reactive-search-app';
}

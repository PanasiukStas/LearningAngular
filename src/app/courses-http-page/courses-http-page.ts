import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesHttpService, Course } from './courses-http.service';
import { Observable, BehaviorSubject, catchError, of, finalize } from 'rxjs';

@Component({
  selector: 'app-courses-http-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-http-page.html',
  styleUrls: ['./courses-http-page.css']
})
export class CoursesHttpPage implements OnInit {
  courses$ = new BehaviorSubject<Course[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private coursesService: CoursesHttpService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading$.next(true);
    this.error$.next(null);

    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses$.next(courses);
        this.isLoading$.next(false);
      },
      error: (err) => {
        this.error$.next('Помилка завантаження курсів. Переконайтеся, що json-server запущено на порту 3000.');
        console.error('Error fetching courses:', err);
        this.isLoading$.next(false);
      }
    });
  }

  retry(): void {
    this.loadCourses();
  }
}

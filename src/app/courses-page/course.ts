import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, title: 'Angular Basics', category: 'Frontend', duration: '5 годин' },
    { id: 2, title: 'RxJS Masterclass', category: 'Frontend', duration: '3 години' },
    { id: 3, title: 'Node.js Backend', category: 'Backend', duration: '8 годин' },
    { id: 4, title: 'PostgreSQL for Beginners', category: 'Database', duration: '4 години' },
    { id: 5, title: 'Kotlin Android Dev', category: 'Mobile', duration: '10 годин' }
  ];

  searchCourses(query: string): Observable<Course[]> {
    const filtered = this.courses.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CourseItem {
  id: number;
  title: string;
  category: string;
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private mockCourses: CourseItem[] = [
    { id: 101, title: 'Вступ до Python', category: 'Data Science', duration: '4 тижні' },
    { id: 102, title: 'Основи UI/UX дизайну', category: 'Design', duration: '2 тижні' },
    { id: 103, title: 'Просунутий TypeScript', category: 'Web Dev', duration: '15 годин' },
    { id: 104, title: 'DevOps з нуля до Pro', category: 'DevOps', duration: '6 тижнів' },
    { id: 105, title: 'React та Redux', category: 'Web Dev', duration: '20 годин' }
  ];

  fetchCoursesByTitle(searchText: string): Observable<CourseItem[]> {
    const term = searchText.trim().toLowerCase();

    const searchResult = this.mockCourses.filter(course =>
      course.title.toLowerCase().includes(term)
    );

    return of(searchResult).pipe(delay(400));
  }
}

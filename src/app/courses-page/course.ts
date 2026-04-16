import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private coursesSubject = new BehaviorSubject<CourseItem[]>([
    { id: 101, title: 'Вступ до Python', category: 'Data Science', duration: '4 тижні' },
    { id: 102, title: 'Основи UI/UX дизайну', category: 'Design', duration: '2 тижні' },
    { id: 103, title: 'Просунутий TypeScript', category: 'Web Dev', duration: '15 годин' },
    { id: 104, title: 'DevOps з нуля до Pro', category: 'DevOps', duration: '6 тижнів' },
    { id: 105, title: 'React та Redux', category: 'Web Dev', duration: '20 годин' },
    { id: 106, title: 'Angular для початківців', category: 'Web Dev', duration: '12 годин' }
  ]);

  getCourses$(): Observable<CourseItem[]> {
    return this.coursesSubject.asObservable();
  }

  getCategories$(): Observable<string[]> {
    return this.coursesSubject.asObservable().pipe(
      map(courses => [...new Set(courses.map(c => c.category))])
    );
  }

  fetchCoursesByTitle(searchText: string): Observable<CourseItem[]> {
    const term = searchText.trim().toLowerCase();

    return this.coursesSubject.asObservable().pipe(
      map(courses =>
        courses.filter(course =>
          course.title.toLowerCase().includes(term)
        )
      )
    );
  }

  addCourse(course: Omit<CourseItem, 'id'>): void {
    const currentCourses = this.coursesSubject.getValue();
    const maxId = currentCourses.length > 0
      ? Math.max(...currentCourses.map(c => c.id))
      : 100;
    const newCourse: CourseItem = { id: maxId + 1, ...course };
    this.coursesSubject.next([...currentCourses, newCourse]);
  }

  deleteCourse(id: number): void {
    const currentCourses = this.coursesSubject.getValue();
    this.coursesSubject.next(currentCourses.filter(c => c.id !== id));
  }
}

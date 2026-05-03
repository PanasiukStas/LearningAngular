import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  category: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesHttpService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      delay(1500)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { CourseService, Course } from './course';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses-page.html',
  styleUrls: ['./courses-page.css']
})
export class CoursesPage implements OnInit {
  searchControl = new FormControl('');
  courses$!: Observable<Course[]>;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(query => query ? query.trim() : ''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => this.courseService.searchCourses(query || ''))
    );
  }
}

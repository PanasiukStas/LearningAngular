import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { CourseService, CourseItem } from './course';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses-page.html',
  styleUrls: ['./courses-page.css']
})
export class CoursesPage implements OnInit {
  searchInput = new FormControl('', { nonNullable: true });

  coursesList$!: Observable<CourseItem[]>;

  constructor(private apiService: CourseService) { }

  ngOnInit(): void {
    this.coursesList$ = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(value => value.trim()),
      debounceTime(350),
      distinctUntilChanged(),
      switchMap(query => this.apiService.fetchCoursesByTitle(query))
    );
  }
}

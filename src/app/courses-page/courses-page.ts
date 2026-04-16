import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
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

  courseForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    duration: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

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

  onAddCourse(): void {
    if (this.courseForm.invalid) return;

    const { title, category, duration } = this.courseForm.getRawValue();
    this.apiService.addCourse({ title, category, duration });
    this.courseForm.reset();
  }

  onDeleteCourse(id: number): void {
    this.apiService.deleteCourse(id);
  }
}

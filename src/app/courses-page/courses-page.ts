import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';
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
  categoryFilter = new FormControl('', { nonNullable: true });

  courseForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    duration: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  coursesList$!: Observable<CourseItem[]>;
  categories$!: Observable<string[]>;

  constructor(private apiService: CourseService) { }

  ngOnInit(): void {
    this.categories$ = this.apiService.getCategories$();

    const search$ = this.searchInput.valueChanges.pipe(
      startWith(''),
      debounceTime(350),
      distinctUntilChanged(),
      map(value => value.trim().toLowerCase())
    );

    const category$ = this.categoryFilter.valueChanges.pipe(
      startWith('')
    );

    this.coursesList$ = combineLatest([search$, category$, this.apiService.getCourses$()]).pipe(
      map(([searchTerm, selectedCategory, courses]) =>
        courses.filter(course => {
          const matchesTitle = course.title.toLowerCase().includes(searchTerm);
          const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
          return matchesTitle && matchesCategory;
        })
      )
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

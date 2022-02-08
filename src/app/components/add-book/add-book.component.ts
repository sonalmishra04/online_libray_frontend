import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.bookForm = this.formBuilder.group({
      book: [' '],
      author: [' '],
      username: [' '],
      categories: [' '],
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    this.bookForm.value.categories = [this.bookForm.value.categories];
    console.log(this.bookForm.value);
    this.crudService.AddBook(this.bookForm.value).subscribe({
      complete: () => {
        console.log('Data Added');
        this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

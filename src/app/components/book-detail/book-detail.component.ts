import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/service/book';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  getId: any;
  updateForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudApi: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudApi.getBook(this.getId).subscribe((res) => {
      this.updateForm.setValue({
        book: res['book'],
        author: res['author'],
        username: res['username'],
        categories: res['categories'],
      });
    });

    this.updateForm = this.formBuilder.group({
      book: [''],
      author: [''],
      username: [''],
      categories: [''],
    });
  }

  ngOnInit(): void {}
  onUpdate() {
    this.crudApi.UpdateBook(this.getId, this.updateForm.value).subscribe({
      complete: () => {
        console.log('Data updated!');
        this.ngZone.run(() => {
          this.router.navigateByUrl(`/books-list`);
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private crudService: CrudService
  ) {
  this.bookForm = this.formBuilder.group({
    isbn: [''],
    title: [''],
    author: [''],
    description: [''],
    published_year: [''],
    publisher: ['']
    })
  }

  ngOnInit(): void { 
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.crudService.GetBook(this.bookId).subscribe(res => {
      this.bookForm.patchValue({
        isbn: res['isbn'], 
        title: res['title'], 
        author: res['author'], 
        description: res['description'], 
        published_year: res['published_year'], 
        publisher: res['publisher']
      })
    })
  }

  onSubmit(): void {
    this.crudService.UpdateBook(this.bookId, this.bookForm.value).subscribe(() => {
      alert('Book updated successfully');
      this.router.navigate(['/books-list']);
    });
  }
}
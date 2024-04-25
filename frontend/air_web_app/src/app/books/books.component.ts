import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book, RestDataSourceService } from '../rest-data-source.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books?: Book[]

  constructor(private datasource: RestDataSourceService) {}
  ngOnInit(): void {
      this.datasource.books.subscribe(
        data => this.books = data
      )
      console.log(this.books)
  }  
}

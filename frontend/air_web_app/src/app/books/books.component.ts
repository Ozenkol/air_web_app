import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book, Passanger, RestDataSourceService } from '../rest-data-source.service';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  passanger!: Passanger
  books?: Book[]
  seat_class!: string
  total_price!: number
  
  constructor(private datasource: RestDataSourceService) {}
  ngOnInit(): void {
    console.log("asad")
    this.datasource.passanger.subscribe(
      data => this.passanger = data
    )
    this.datasource.books().subscribe(
      data => this.books = data
    )
  }  
  delete(id: number) {
    this.datasource.deleteBook(id).subscribe(

    )
    this.books = this.books?.filter(book => book.id != id)
  }
  update(book: Book, seat_class: string) {
    if (seat_class == "economic") {
      this.total_price = book.flight.price_economy
    }
    else if (seat_class == "busines") {
      this.total_price = book.flight.price_business
    }
    else if (seat_class == "first") {
      this.total_price = book.flight.price_first
    }
    this.datasource.updateBook(book.id, seat_class ?? "", this.total_price).subscribe()
  }
}

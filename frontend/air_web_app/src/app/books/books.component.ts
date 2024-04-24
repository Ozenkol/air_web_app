import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RestDataSourceService } from '../rest-data-source.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  constructor(private datasource: RestDataSourceService) {}

  
}

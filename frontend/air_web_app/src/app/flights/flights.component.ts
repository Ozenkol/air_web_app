import { Component, Input } from '@angular/core';
import { Flight, RestDataSourceService } from '../rest-data-source.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {
  @Input() flights ?: Flight[]
}

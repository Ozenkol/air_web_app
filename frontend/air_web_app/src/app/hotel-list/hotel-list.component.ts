import { Component } from '@angular/core';
import { HotelComponent } from '../hotel/hotel.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [HotelComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent {

}

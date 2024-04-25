import { Component } from '@angular/core';

@Component({
  selector: 'app-direction',
  standalone: true,
  imports: [],
  templateUrl: './direction.component.html',
  styleUrl: './direction.component.css'
})
export class DirectionComponent {
  selectedDestination: string = 'T O K Y O';
  selectedDestinationImage: string = 'assets/images/Tokyo.jpg';

  onDestinationChange(event: any) {
    const selectedValue = event.target.value;
  
    switch(selectedValue) {
      case 'Алматы':
        this.selectedDestination = "T O K Y O";
        this.selectedDestinationImage = 'assets/images/Tokyo.jpg';
        break;
      case 'Астана':
        this.selectedDestination = "D U B A I";
        this.selectedDestinationImage = 'assets/images/Dubai.webp';
        break;
      case 'Орал':
        this.selectedDestination = "N E W Y O R K";
        this.selectedDestinationImage = 'assets/images/NewYork.jpg';
        break;
      // Добавьте кейсы для других направлений, если нужно
    }
  }
}
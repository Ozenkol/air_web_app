import { Component } from '@angular/core';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MenuBarComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

}

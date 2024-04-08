import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { DirectionComponent } from '../direction/direction.component';
import { SelectorComponent } from '../selector/selector.component';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, MenuBarComponent, DirectionComponent, SelectorComponent, NewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

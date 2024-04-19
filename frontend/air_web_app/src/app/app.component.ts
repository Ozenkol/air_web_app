import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HotelComponent } from './hotel/hotel.component';
import { SelectorComponent } from './selector/selector.component';
import { DirectionComponent } from './direction/direction.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, NewsComponent, HomeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InfinityAirLine'
}

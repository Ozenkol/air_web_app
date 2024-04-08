import { Routes } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'hotels', component:HotelListComponent}
];

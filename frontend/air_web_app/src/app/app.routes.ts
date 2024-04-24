import { Routes } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'hotels', component:HotelListComponent},
    {path: 'sign-in', component: LogInComponent},
    {path: 'sign-up', component:SignUpComponent}
];

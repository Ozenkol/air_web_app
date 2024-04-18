import { Component } from '@angular/core';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [LogInComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {

}

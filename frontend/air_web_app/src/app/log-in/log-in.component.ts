import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RestDataSourceService } from '../rest-data-source.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  username ?: string
  password ?: string
  errorMessage ?: string

  constructor(private authService: RestDataSourceService) {}

  authenticate(form : NgForm) {
    console.log(this.username, this.password)
    if (form.valid) {
      this.authService.authenticate(this.username ?? "", this.password ?? "").subscribe(
        response => {
          if (response) {
            this.errorMessage = "Good"
          }
          else {
            this.errorMessage = "Authentication failed"
          }
        }
          
      )
    }
    else {
      this.errorMessage = "Form Data Invalid";
    }
  }
}

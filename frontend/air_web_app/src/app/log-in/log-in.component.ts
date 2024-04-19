import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RestDataSourceService } from '../rest-data-source.service';
import { AuthServiceService } from '../auth-service.service';

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

  constructor(private authService: AuthServiceService) {}

  authenticate(form : NgForm) {
    console.log("Form worka!")
    if (form.valid) {
      console.log("Form valid!")
      this.authService.authenticate(this.username ?? "", this.password ?? "").subscribe()
    }
    else {
      this.errorMessage = "Form Data Invalid";
    }
  }
}

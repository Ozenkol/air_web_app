import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RestDataSourceService } from '../rest-data-source.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

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
  rememberMe: boolean = false;

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  authenticate(form : NgForm) {
    if (form.valid) {
      this.authService.authenticate(this.username ?? "", this.password ?? "").subscribe(
        response => {
          if (response) {
            this.errorMessage = undefined
            this.router.navigateByUrl('')
          }
        },
        error => {if (error) {
          this.errorMessage = "Authentication Failed"
        }
        }
      )
    }
    else {
      this.errorMessage = "Form Data Invalid";
    }
  }
}

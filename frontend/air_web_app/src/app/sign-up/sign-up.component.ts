import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username?: string
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  errorMessage?: string

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  registration(form : NgForm) {
    if (form.valid) {
      this.authService.registration(this.username ?? "", 
      this.first_name ?? "", this.last_name ?? "",
      this.password ?? "",this.email ?? "" ).subscribe(
        response => {
          if(response) {
            this.router.navigateByUrl('')
          }
        },
        error => {if (error) {
          this.errorMessage = "Failed"
        }
        }
      )
    }
    else {
      this.errorMessage = "Form Data Invalid";
    }
  }
  createPassanger() {
    this.authService.createPassenger().subscribe()
  }
}

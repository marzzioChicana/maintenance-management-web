import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  signUp(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    const registerRequest = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    console.log(registerRequest);

    this.authenticationService.signUp(registerRequest).subscribe(
      (response) => {
        this.router.navigate(['/sign-in']);
      },
      (error) => {
        this.errorMessage = "Registration failed. Please try again."
        console.log(error);
      }
    );
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in']).then();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule , InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  signIn(): void {
    const signInRequest = {
      username: this.username,
      password: this.password
    };

    console.log(signInRequest);

    this.authenticationService.signIn({username: this.username, password: this.password}).subscribe(
      (response) => {
        this.authenticationService.setSignedIn(true);
        this.authenticationService.setSignedInUserId(response.id);
        this.authenticationService.setSignedInUsername(response.username);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/machines']);
      },
      (error) => {
        this.errorMessage = "Incorrect credentials. Please try again."
        this.authenticationService.signOut();
        console.log(error);
      }
    );
  }

  goToSignUp(): void {
    this.router.navigate(['/sign-up']).then();
  }
}

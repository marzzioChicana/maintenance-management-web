import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-close',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './close.component.html',
  styleUrl: './close.component.css'
})
export class CloseComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private userService: UserService) {}

  deleteValues(): void {
    this.authenticationService.signOut();
  }

  ngOnInit(): void {
    console.log('Card Machine Component initialized');
    console.log('Current user id: ' + this.authenticationService.getCurrentUserId());
    console.log('Current user name: ' + this.authenticationService.getCurrentUsername());

    this.userService.getUsers().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

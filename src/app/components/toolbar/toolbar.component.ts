import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @ViewChild('navToggle', { static: true }) navToggle!: ElementRef;
  @ViewChild('navMenu', { static: true }) navMenu!: ElementRef;

  menuVisible = false;

  constructor(private renderer: Renderer2, private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.setupMenu();
  }

  setupMenu(): void {
    const toggle = this.navToggle.nativeElement;
    const nav = this.navMenu.nativeElement;
    const navItems = nav.querySelectorAll('a');

    this.renderer.listen(toggle, 'click', () => {
      this.menuVisible = !this.menuVisible;

      if (this.menuVisible) {
        this.renderer.addClass(nav, 'show-menu');
        this.renderer.addClass(toggle, 'show-icon');
      } else {
        this.renderer.removeClass(nav, 'show-menu');
        this.renderer.removeClass(toggle, 'show-icon');
      }
    });

    navItems.forEach((item: HTMLElement) => {
      this.renderer.listen(item, 'click', () => {
        this.renderer.removeClass(nav, 'show-menu');
        this.renderer.removeClass(toggle, 'show-icon');
        this.menuVisible = false;
      });
    });
  }

  goToMachines(): void {
    this.router.navigate(['/machines']).then();
  }

  goToAddMachines(): void {
    this.router.navigate(['/machines/add']).then();
  }

  goToMaintenances(): void {
    this.router.navigate(['/maintenances']).then();
  }

  goToSpareParts(): void {
    this.router.navigate(['/spare/parts']).then();
  }

  goToClose(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to close the application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authenticationService.signOut();
      }
    })
  }
}

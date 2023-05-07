import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.authservice.loggedInUser().subscribe({next: (user) => {
      this.loggedInUser = user;
    }, error: (err) => {
      console.error(err);
    }});
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout() {
    if(this.loggedInUser) {
      this.authservice.logout().catch(console.error);
    }
  }
}

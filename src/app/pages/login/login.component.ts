import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required])
  });

  loading: boolean = false;

  constructor(private authservice: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loginSubmit() {
    if(this.loginForm.valid) {
      this.loading = true;
      this.authservice.login(this.loginForm.get('email')?.value, this.loginForm.get('pass')?.value).then(cred => {
        // console.log(cred);
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.snackBar.open('Sikertelen bejelentkezés!', 'Bezár', {
          //duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.loading = false;
      });
    }
  }
}

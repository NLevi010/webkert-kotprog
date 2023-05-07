import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  user: User = {
    id: '',
    address: '',
    birthday: '',
    email: '',
    firstname: '',
    lastname: ''
  };

  constructor(private userService: UserService, private authService: AuthService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.get(this.authService.loggedInId() as string).subscribe({
      next: (user) => {
        if (user) {
          Object.assign(this.user, user[0]);
          this.editForm.get('firstname')?.setValue(this.user.firstname);
          this.editForm.get('lastname')?.setValue(this.user.lastname);
          this.editForm.get('birthday')?.setValue(this.user.birthday);
          this.editForm.get('address')?.setValue(this.user.address);
        }
      }
    });
  }

  editSubmit() {
    if (this.editForm.valid) {
      this.user.address = this.editForm.get('address')?.value;
      this.user.birthday = this.editForm.get('birthday')?.value;
      this.user.firstname = this.editForm.get('firstname')?.value;
      this.user.lastname = this.editForm.get('lastname')?.value;
      this.userService.edit(this.user).then(() => {
        this.snackbar.open('Sikeres adatváltoztatás!', undefined, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000
        });
      });
    }
  }

}

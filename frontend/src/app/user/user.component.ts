import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  
  registrationForm: FormGroup;
  loginForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registrationForm.valid) {
      const { firstName, lastName, email, password } = this.registrationForm.value;
      this.userService.register(firstName, lastName, email, password).subscribe(
        response => {
          this.message = 'Sikeres regisztráció! Kérjük jelentkezzen be.';
          this.clearMessageAfterDelay();
          this.registrationForm.reset();
        },
        error => {
          this.message = 'Hiba történt a regisztráció során';
        }
      );
    } else {
      this.message = 'Kérjük, töltse ki helyesen az űrlapot.';
      this.registrationForm.markAllAsTouched();
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        response => {
          this.message = response.message;
          this.clearMessageAfterDelay();
          if (response.success) {
            this.router.navigateByUrl('/home');
          }
        },
        error => {
          this.message = 'Hiba történt a bejelentkezés során';
        }
      );
    } else {
      this.message = 'Minden mező kitöltése kötelező.';
      this.loginForm.markAllAsTouched();
    }
  }

  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}

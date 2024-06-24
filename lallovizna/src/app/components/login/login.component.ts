import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private readonly usersService: UsersService,
              private readonly router: Router
  ) { }

  /**
   * Realiza el login
   */
  login(): void {
    if(this.form.invalid) return;
    this.usersService.login(this.form.value.user, this.form.value.password).subscribe({
      next: (res) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/bo']);
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}

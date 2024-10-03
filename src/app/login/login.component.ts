import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitoService } from '../services/cognito.service';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cognitoService: CognitoService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    return this.cognitoService.login(email, password)
      .then(() => {
        this.router.navigate(['/profile']);
        console.log('Logged in')
      })
      .catch((err) => {
        console.log('error in login')
        this.errorMessage = err.message || 'Login failed';
      });
  }
}

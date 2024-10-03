import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitoService } from '../services/cognito.service';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cognitoService: CognitoService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      favoriteSport: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email, password, favoriteSport } = this.registerForm.value;

    this.cognitoService.register(email, password, favoriteSport)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.errorMessage = err.message || 'Registration failed';
      });
  }
}

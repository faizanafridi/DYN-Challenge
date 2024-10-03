import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CognitoService } from '../services/cognito.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let cognitoServiceSpy: jasmine.SpyObj<CognitoService>;

  beforeEach(() => {
    cognitoServiceSpy = jasmine.createSpyObj('CognitoService', ['login']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,LoginComponent,RouterTestingModule],
      providers: [
        { provide: CognitoService, useValue: cognitoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should call cognitoService.login on submit', () => {
    cognitoServiceSpy.login.and.returnValue(Promise.resolve());
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();
    expect(cognitoServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should display error message on login failure', async () => {
    const mockError = new Error('Login failed');
    cognitoServiceSpy.login.and.rejectWith(mockError);
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    await component.onSubmit();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error');
    console.log('error message',errorMessage)
    expect(cognitoServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(errorMessage.textContent).toContain('Login failed');
  });
});

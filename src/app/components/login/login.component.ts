// login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalMessageServiceService } from '../../services/global-message-service.service';
import { ShopState } from '../../states/shop.state';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private shopState = inject(ShopState);
  private messageService = inject(GlobalMessageServiceService);
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.shopState.login(
        this.loginForm.get('username')?.value as string,
        this.loginForm.get('password')?.value as string
      );
      this.messageService.setMessage('Iniciado exitosamente');
      this.router.navigate([''], { replaceUrl: true });
    } else {
      this.messageService.setErrorMessage('Error al iniciar sesión');
    }
  }
}

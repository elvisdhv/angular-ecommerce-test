import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [ReactiveFormsModule, InputMaskModule, InputTextModule, FloatLabelModule, NgClass],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
})
export class BuyComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  finishBuyFormGroup!: FormGroup;

  // Errores
  cardNumberError = signal(false);
  passworDoesNotMatch = signal(false);
  ngOnInit(): void {
    this.finishBuyFormGroup = this.initFormGroup(this.formBuilder);
  }
  initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/)],
      ],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  get cardNumber() {
    return this.finishBuyFormGroup.get('cardNumber');
  }

  get password() {
    return this.finishBuyFormGroup.get('password');
  }

  get confirmPassword() {
    return this.finishBuyFormGroup.get('confirmPassword');
  }
  submit(event: SubmitEvent) {
    event.preventDefault();
    if (this.cardNumber?.invalid) {
      this.cardNumberError.set(true);
    } else {
      this.cardNumberError.set(false);
    }
    console.log(this.password?.value);
    console.log(this.confirmPassword?.value);
    if (this.password?.invalid && this.confirmPassword?.invalid) {
      this.passworDoesNotMatch.set(true);
    } else if (this.password?.value !== this.confirmPassword?.value) {
      this.passworDoesNotMatch.set(true);
    } else {
      this.passworDoesNotMatch.set(false);
    }
  }
}

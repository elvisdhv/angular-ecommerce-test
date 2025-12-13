import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ShopStateService } from '../../services/shop-state.service';
@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [ReactiveFormsModule, InputMaskModule, InputTextModule, FloatLabelModule, NgClass],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
})
export class BuyComponent implements OnInit {
  shopService = inject(ShopStateService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  finishBuyFormGroup!: FormGroup;

  // Errores
  cardNumberError = signal(false);
  passworDoesNotMatch = signal(false);
  wrongPassword = signal(false);
  blankPassword = signal(false);
  blankConfirmPassword = signal(false);
  ngOnInit(): void {
    this.finishBuyFormGroup = this.initFormGroup(this.formBuilder);
  }
  totalPrice() {
    let acc = 0;
    this.shopService.getSelectedProducts().forEach((p) => (acc += p.price));
    return acc;
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
      this.blankPassword.set(false);
      this.blankConfirmPassword.set(false);
      this.passworDoesNotMatch.set(false);
      this.wrongPassword.set(false);
    } else if (this.password?.value === '') {
      this.blankPassword.set(true);
      this.cardNumberError.set(false);
      this.blankConfirmPassword.set(false);
      this.passworDoesNotMatch.set(false);
      this.wrongPassword.set(false);
    } else if (this.confirmPassword?.value === '') {
      this.blankConfirmPassword.set(true);
      this.cardNumberError.set(false);
      this.blankPassword.set(false);
      this.passworDoesNotMatch.set(false);
      this.wrongPassword.set(false);
    } else if (this.password?.invalid && this.confirmPassword?.invalid) {
      this.passworDoesNotMatch.set(true);
      this.cardNumberError.set(false);
      this.blankPassword.set(false);
      this.blankConfirmPassword.set(false);
      this.wrongPassword.set(false);
    } else if (this.password?.value !== this.confirmPassword?.value) {
      this.passworDoesNotMatch.set(true);
      this.cardNumberError.set(false);
      this.blankPassword.set(false);
      this.blankConfirmPassword.set(false);
      this.wrongPassword.set(false);
    } else if (this.shopService.getUserPassword() != this.password?.value) {
      this.wrongPassword.set(true);
      this.cardNumberError.set(false);
      this.blankPassword.set(false);
      this.blankConfirmPassword.set(false);
      this.passworDoesNotMatch.set(false);
    } else {
      this.cardNumberError.set(false);
      this.blankPassword.set(false);
      this.blankConfirmPassword.set(false);
      this.passworDoesNotMatch.set(false);
      this.wrongPassword.set(false);
      this.processPayment();
    }
  }
  processPayment() {
    this.finishBuyFormGroup.reset();
    this.router.navigate(['buy-succesfull'], {
      state: {
        products: this.shopService.getSelectedProducts(),
        total: this.totalPrice(),
      },
    });
    this.shopService.finishBuy();
  }
}

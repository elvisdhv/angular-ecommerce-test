import { Component, inject, OnInit } from '@angular/core';
import { StoreApiService } from './services/store-api-service.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  apiService = inject(StoreApiService);
  ngOnInit(): void {}
}

import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './global-components/message/message.component';
import { StoreApiService } from './services/store-api-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  apiService = inject(StoreApiService);
  ngOnInit(): void {}
}

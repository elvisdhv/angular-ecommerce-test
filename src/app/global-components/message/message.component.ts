import { Component, inject } from '@angular/core';
import { GlobalMessageServiceService } from '../../services/global-message-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messageService = inject(GlobalMessageServiceService);
}

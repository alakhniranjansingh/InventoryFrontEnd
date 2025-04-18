import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  title = 'InventoryManagementSystem';
  messageService: any;
  showToast() {
    // Example: showing a success message
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Item added successfully!'});
  }
}

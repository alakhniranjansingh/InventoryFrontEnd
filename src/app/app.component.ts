import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ToastModule, SidebarModule, ButtonModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'InventoryManagementSystem';
sidebarVisible: boolean = true;
  // visible: boolean = true;

  // toggleSidebar() {
  //   this.visible = !this.visible;
  // }

  constructor(private messageService: MessageService) {}

  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added successfully!' });
  }
}

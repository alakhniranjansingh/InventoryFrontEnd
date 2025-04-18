

// import { Component, OnInit } from '@angular/core';
// import { ItemService, Item } from '../services/item.service';
// import { CommonModule } from '@angular/common';
// import { TableModule } from 'primeng/table';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { DropdownModule } from 'primeng/dropdown';
// import { FormsModule } from '@angular/forms';


// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { DialogModule } from 'primeng/dialog';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { PaginatorModule } from 'primeng/paginator';
// import { PanelModule } from 'primeng/panel';
// import { ToastModule } from 'primeng/toast';

// @Component({
//   selector: 'app-item-list',
//   standalone: true,
//   imports: [CommonModule,ToastModule,PanelModule,FormsModule,DropdownModule,ConfirmDialogModule, PaginatorModule, TableModule, DialogModule, ReactiveFormsModule],
//   templateUrl: './item-list.component.html',
//   styleUrls: ['./item-list.component.css'],
//   providers: [ConfirmationService,MessageService],
// })
// export class ItemListComponent implements OnInit {
//   items: Item[] = [];
//   itemForm: FormGroup;
//   displayDialog: boolean = false;
//   isEdit: boolean = false;
//    private apiUrl: any= 'https://localhost:7022/api/item';
//   reload() {
//     console.log('Refreshing data...');
//   }

//   export() {
//     console.log('Exporting data...');
//   }

//   constructor(
//     private itemService: ItemService,
//     private confirmationService: ConfirmationService,
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private messageService: MessageService
//   ) {
//     this.itemForm = this.fb.group({
//       itemId: [null],
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       category: ['', Validators.required],
//       unit: ['', Validators.required],
//       price: [null, [Validators.required, Validators.min(0)]],
//     });
//   }

//   ngOnInit(): void {
//     this.loadItems();
//   }

//   loadItems() {
//     this.itemService.getItems().subscribe((data) => (this.items = data));
//   }

//   openAddDialog() {
//     this.itemForm.reset(); // Reset the form when adding a new item
//     this.isEdit = false;
//     this.displayDialog = true;
//   }

//   openEditDialog(item: Item) {
//     this.itemForm.patchValue(item); // Pre-populate form for editing
//     this.isEdit = true;
//     this.displayDialog = true;
//   }

//   saveItem() {
//     if (this.itemForm.invalid) {
//       this.itemForm.markAllAsTouched(); // Mark all fields as touched to show errors
//       return;
//     }

//     const item = { ...this.itemForm.value };

//     if (this.isEdit) {
//       this.itemService.updateItem(item).subscribe(() => {
//         this.displayDialog = false;
//         this.loadItems();
//       });
//     } else {
//       delete item.itemId; // Don't send itemId in POST request
//       this.itemService.addItem(item).subscribe(() => {
//         this.displayDialog = false;
//         this.loadItems();
//       });
//     }
//   }

//   closeDialog() {
//     this.displayDialog = false;
//   }

//   deleteItem(itemId: number) {
//     this.confirmationService.confirm({
//       message: 'Are you sure you want to delete this item?',
//       header: 'Confirm Deletion',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.itemService.deleteItem(itemId).subscribe({
//           next: () => {
//             this.loadItems(); // Refresh list after deletion
//           },
//           error: (err) => {
//             console.error('Deletion failed', err);
//           }
//         });
//       },
//       reject: () => {
//       },
//     });
//   }


// }
import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ToastModule, PanelModule, FormsModule, DropdownModule, ConfirmDialogModule, PaginatorModule, TableModule, DialogModule, ReactiveFormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  itemForm: FormGroup;
  displayDialog: boolean = false;
  isEdit: boolean = false;
  private apiUrl: any = 'https://localhost:7022/api/item';

  constructor(
    private itemService: ItemService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService // Injecting MessageService
  ) {
    this.itemForm = this.fb.group({
      itemId: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      unit: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe((data) => (this.items = data));
  }

  openAddDialog() {
    this.itemForm.reset();
    this.isEdit = false;
    this.displayDialog = true;
  }

  openEditDialog(item: Item) {
    this.itemForm.patchValue(item);
    this.isEdit = true;
    this.displayDialog = true;
  }

  saveItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const item = { ...this.itemForm.value };

    if (this.isEdit) {
      this.itemService.updateItem(item).subscribe(
        () => {
          this.displayDialog = false;
          this.loadItems();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item updated successfully' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update item' });
        }
      );
    } else {
      delete item.itemId; // Don't send itemId in POST request
      this.itemService.addItem(item).subscribe(
        () => {
          this.displayDialog = false;
          this.loadItems();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added successfully' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add item' });
        }
      );
    }
  }

  closeDialog() {
    this.displayDialog = false;
  }

  deleteItem(itemId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itemService.deleteItem(itemId).subscribe(
          () => {
            this.loadItems();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted successfully' });
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete item' });
          }
        );
      },
      reject: () => {
        // Optional: handle cancel
      },
    });
  }
}

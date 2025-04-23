import { Component, OnInit } from '@angular/core';
import { Item, ItemService } from '../services/item.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { HttpClient } from '@angular/common/http';

// import { Component, OnInit } from '@angular/core';
// import { ItemService, Item } from '../services/item.service';
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
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dynamicpagination',
  imports: [CommonModule, ToastModule, PanelModule, FormsModule, DropdownModule, ConfirmDialogModule, PaginatorModule, TableModule, DialogModule, ReactiveFormsModule],
  templateUrl: './dynamicpagination.component.html',
  styleUrl: './dynamicpagination.component.css',
  animations: [
    trigger('panelContent', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ],
  // styleUrls: ['./item-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class DynamicpaginationComponent implements OnInit {

  items: Item[] = [];
  totalRecords: number = 0;
  rowsPerPage: number = 10;

  loadItems(event: any): void {
    const page = event.first / event.rows;
    const size = event.rows;

    this.itemService.getPagination(page, size).subscribe(response => {
      this.items = response.data;
      this.totalRecords = response.totalRecords;
    });
  }

  refreshItems(): void {
    this.loadItems({ first: 0, rows: this.rowsPerPage });
  }


  // items: Item[] = [];
  itemForm: FormGroup;
  displayDialog: boolean = false;
  isEdit: boolean = false;
  private apiUrl: any = 'https://localhost:7022/api/item';
  isPanelVisible: any=true;
  loading: boolean = false;

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
    // this.loadItems();
    this.loadItems({ first: 0, rows: this.rowsPerPage });
  }

  // loadItems() {
  //   this.itemService.getItems().subscribe((data) => (this.items = data));
  // }

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
          this.loadItems({ first: 0, rows: this.rowsPerPage });
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
          this.loadItems({ first: 0, rows: this.rowsPerPage });
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
            this.loadItems({ first: 0, rows: this.rowsPerPage });
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


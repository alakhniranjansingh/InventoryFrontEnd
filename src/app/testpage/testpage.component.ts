import { Component } from '@angular/core';
import { DynamicpaginationComponent } from "../modules/item-master/components/dynamicpagination/dynamicpagination.component";

@Component({
  selector: 'app-testpage',
  imports: [DynamicpaginationComponent],
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.css'
})
export class TestpageComponent {

}

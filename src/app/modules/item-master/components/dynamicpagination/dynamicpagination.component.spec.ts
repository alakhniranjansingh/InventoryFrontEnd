import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicpaginationComponent } from './dynamicpagination.component';

describe('DynamicpaginationComponent', () => {
  let component: DynamicpaginationComponent;
  let fixture: ComponentFixture<DynamicpaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicpaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicpaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

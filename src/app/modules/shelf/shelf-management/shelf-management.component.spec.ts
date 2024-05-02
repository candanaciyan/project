import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfManagementComponent } from './shelf-management.component';

describe('ShelfManagementComponent', () => {
  let component: ShelfManagementComponent;
  let fixture: ComponentFixture<ShelfManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShelfManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShelfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAcceptComponent } from './product-accept.component';

describe('ProductAcceptComponent', () => {
  let component: ProductAcceptComponent;
  let fixture: ComponentFixture<ProductAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAcceptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

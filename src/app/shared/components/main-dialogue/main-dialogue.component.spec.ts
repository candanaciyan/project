import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDialogueComponent } from './main-dialogue.component';

describe('MainDialogueComponent', () => {
  let component: MainDialogueComponent;
  let fixture: ComponentFixture<MainDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

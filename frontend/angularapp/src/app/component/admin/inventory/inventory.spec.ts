import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInventoryComponent } from './inventory';

describe('AdminInventoryComponent', () => {
  let component: AdminInventoryComponent;
  let fixture: ComponentFixture<AdminInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

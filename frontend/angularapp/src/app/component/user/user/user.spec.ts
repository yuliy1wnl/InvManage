import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponents } from './user';

describe('UserComponents', () => {
  let component: UserComponents;
  let fixture: ComponentFixture<UserComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

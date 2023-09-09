import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTenantDropdownComponent } from './ui-tenant-dropdown.component';

describe('UiTenantDropdownComponent', () => {
  let component: UiTenantDropdownComponent;
  let fixture: ComponentFixture<UiTenantDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiTenantDropdownComponent]
    });
    fixture = TestBed.createComponent(UiTenantDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

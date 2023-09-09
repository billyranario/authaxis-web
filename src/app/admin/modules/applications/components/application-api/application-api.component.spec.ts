import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationApiComponent } from './application-api.component';

describe('ApplicationApiComponent', () => {
  let component: ApplicationApiComponent;
  let fixture: ComponentFixture<ApplicationApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationApiComponent]
    });
    fixture = TestBed.createComponent(ApplicationApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

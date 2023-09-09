import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationViewApiComponent } from './application-view-api.component';

describe('ApplicationViewApiComponent', () => {
  let component: ApplicationViewApiComponent;
  let fixture: ComponentFixture<ApplicationViewApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationViewApiComponent]
    });
    fixture = TestBed.createComponent(ApplicationViewApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

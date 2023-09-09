import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationViewSettingsComponent } from './application-view-settings.component';

describe('ApplicationViewSettingsComponent', () => {
  let component: ApplicationViewSettingsComponent;
  let fixture: ComponentFixture<ApplicationViewSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationViewSettingsComponent]
    });
    fixture = TestBed.createComponent(ApplicationViewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

// INTERFACES
import { IApplication } from 'src/app/admin/modules/applications';

// SERVICES
import { ApplicationApiService } from 'src/app/core/services';

// UTILS
import { trackById } from '../../utils/track-by.util';

@Component({
  selector: 'ui-tenant-dropdown',
  templateUrl: './ui-tenant-dropdown.component.html',
  styleUrls: ['./ui-tenant-dropdown.component.scss'],
})
export class UiTenantDropdownComponent implements OnInit, OnDestroy {
  @Input()
  defaultApplicationId: string = '';

  @Input()
  classes: string =
    'w-full mt-2 px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white';

  @Output()
  selectedOptionEvent = new EventEmitter<string>();

  application: FormControl = new FormControl('');
  applications: IApplication[] = [];
  selectedApplicationId: string = '';

  trackById = trackById;

  private onDestroy$ = new Subject();

  constructor(private applicationApiService: ApplicationApiService) {}

  ngOnInit(): void {
    this.getApplications();
    this.initDefaultApplication();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onSelect(event: Event): void {
    const { value } = event.target as HTMLSelectElement;
    this.selectedApplicationId = value;
    this.selectedOptionEvent.emit(value);
  }

  private getApplications(): void {
    this.applicationApiService
      .getList({
        sortBy: 'application_name',
        sortDirection: 'asc',
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (response: { data: IApplication[] }) => {
          this.applications = response.data ?? [];
        },
        error: (error: any) => console.log(error),
      });
  }

  private initDefaultApplication(): void {
    this.application?.patchValue(this.defaultApplicationId ?? '');
  }
}

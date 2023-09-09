import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownService } from '../../services';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './ui-dropdown.component.html',
  styleUrls: ['./ui-dropdown.component.scss'],
})
export class UiDropdownComponent implements OnInit, OnDestroy {
  @Input()
  id: any = 0;

  @Input()
  options: { value: any; label: string }[] = [];

  @Output()
  selected = new EventEmitter<string>();

  open = false;

  private sub!: Subscription;
  private globalClickUnsubscriber: Function | undefined;

  constructor(
    private dropdownService: DropdownService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); 
    this.unsubscribeGlobalClickEvent();
  }

  onSelect(option: any): void {
    this.selected.emit(option);
    this.open = false;
  }

  toggleDropdown(): void {
    if (this.open) {
      this.dropdownService.closeDropdowns();
      this.unsubscribeGlobalClickEvent();
    } else {
      this.dropdownService.openDropdown(this.id);
    }
  }

  private initSubscriptions(): void {
    this.sub = this.dropdownService.openedDropdown$.subscribe((openId) => {
      if (openId === this.id) {
        this.open = true;
        this.subscribeGlobalClickEvent();
      } else {
        this.open = false;
        this.unsubscribeGlobalClickEvent();
      }
    });

  }

  private subscribeGlobalClickEvent(): void {
    this.globalClickUnsubscriber = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.dropdownService.closeDropdowns();
        this.unsubscribeGlobalClickEvent();
      }
    });
  }

  private unsubscribeGlobalClickEvent(): void {
    if (this.globalClickUnsubscriber) {
      this.globalClickUnsubscriber();
      this.globalClickUnsubscriber = undefined;
    }
  }
}

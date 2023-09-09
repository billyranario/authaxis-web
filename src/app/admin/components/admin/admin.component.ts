import {
  Component,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  UrlSegment,
} from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private currentSubmenu: string = '';
  private currentIcon: string = '';
  private onDestroy$ = new Subject();

  activeRouteSegments: string[] = [];
  isMenuHovered: boolean = false;
  user: any = {}; // TODO: Create interface

  menus = {
    gettingStarted: false,
    activity: false,
    applications: true,
    authentication: false,
    users: true,
    security: false,
    settings: false,
  };

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private userService: UserApiService,
  ) {}

  ngOnInit() {
    this.initRouteEvents();
    this.getDataFromService();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  toggleSubMenu(menuId: string, submenuId: string, iconId: string): void {
    const linkItems = this.el.nativeElement.querySelectorAll('.menu-item-link');
    linkItems.forEach((linkItem: HTMLElement) => {
      this.renderer.removeClass(linkItem, 'active');
    });

    // Get the current link item and add the 'active' class
    const linkItem = this.el.nativeElement.querySelector(`#${menuId}`);
    this.renderer.addClass(linkItem, 'active');

    // Close the current submenu, if there is one
    if (this.currentSubmenu && this.currentSubmenu !== submenuId) {
      const currentSubmenu = this.el.nativeElement.querySelector(
        `#${this.currentSubmenu}`,
      );
      const currentIcon = this.el.nativeElement.querySelector(
        `#${this.currentIcon}`,
      );
      this.renderer.setStyle(currentSubmenu, 'display', 'none');
      this.renderer.setStyle(currentIcon, 'transform', 'rotate(0)');
    }

    // Open or close the clicked submenu
    const submenu = this.el.nativeElement.querySelector(`#${submenuId}`);
    const icon = this.el.nativeElement.querySelector(`#${iconId}`);
    const isHidden = window.getComputedStyle(submenu).display === 'none';
    this.renderer.setStyle(submenu, 'display', isHidden ? 'block' : 'none');
    this.renderer.setStyle(
      icon,
      'transform',
      isHidden ? 'rotate(90deg)' : 'rotate(0)',
    );

    // Update the current submenu and icon
    this.currentSubmenu = isHidden ? submenuId : '';
    this.currentIcon = isHidden ? iconId : '';
  }

  onMouseEnter() {
    if (this.currentSubmenu) {
      this.isMenuHovered = true;
      const spanElement = this.el.nativeElement.querySelector(
        `#${this.currentSubmenu} span`,
      );
      this.renderer.addClass(spanElement, 'hovered');
    }
  }

  onMouseLeave() {
    if (this.currentSubmenu) {
      this.isMenuHovered = false;
      const spanElement = this.el.nativeElement.querySelector(
        `#${this.currentSubmenu} span`,
      );
      this.renderer.removeClass(spanElement, 'hovered');
    }
  }

  isRouteActive(routePath: string, submenuId?: string): boolean {
    if (submenuId) {
      return (
        this.activeRouteSegments.includes(routePath) &&
        this.currentSubmenu === submenuId
      );
    }
    return this.activeRouteSegments.includes(routePath);
  }

  private extractRouteSegments(route: any): string[] {
    const segments: string[] = [];
    if (route && route.segments) {
      route.segments.forEach((segment: UrlSegment) => {
        segments.push(segment.path);
      });
    }
    return segments;
  }

  private initRouteEvents(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrlTree = this.router.parseUrl(this.router.url);
        this.activeRouteSegments = this.extractRouteSegments(
          currentUrlTree.root,
        );
      });
  }

  private getDataFromService(): void {
    this.user = this.userService.user$ ?? {};
  }
}

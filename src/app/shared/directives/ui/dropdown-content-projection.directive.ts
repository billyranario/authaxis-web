import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdownContentProjection]',
})
export class DropdownContentProjectionDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (!this.elementRef.nativeElement.innerHTML.trim()) {
      this.renderer.addClass(this.elementRef.nativeElement, 'empty');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'empty');
    }
  }
}

import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ui-icon',
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss']
})
export class UiIconComponent implements OnChanges {
  @Input()
  icon: string = '';

  @Input()
  width: number | string = 18;
  
  @Input()
  height: number | string = 18;
  
  svgIcon: any;
  
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    if (!this.icon) {
      this.svgIcon = '';
      return;
    }

    this.httpClient
      .get(`assets/icons/${this.icon}/${this.icon}.svg`, { responseType: 'text' })
      .subscribe((value) => {
        const svg = value
          .replace(
            'width="64px" height="64px"',
            `width="${this.width}" height="${this.height}"`,
          );

        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(svg);
        this.cd.detectChanges();
      });
  }
}

import { Component, OnInit } from '@angular/core';

// CONFIGS
import { TabConfig } from '../../config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  tabs: { path: string[]; label: string }[] = TabConfig.items;

  ngOnInit(): void {}
}

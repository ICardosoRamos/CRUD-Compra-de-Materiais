import { Component, Input } from '@angular/core';
import { TNavbarData } from './helper';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <ul
      *ngIf="collapsed && data.items && data.items.length > 0 && data.expanded"
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a
          (click)="handleClick(item)"
          class="sublevel-nav-link"
          *ngIf="item.items && item.items.length > 0"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span class="sublevel-link-text" *ngIf="collapsed">{{
            item.label
          }}</span>
          <i
            *ngIf="item.items && collapsed"
            class="menu-collapse-icon"
            [ngClass]="
              !item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'
            "
            ]
          ></i>
        </a>
        <a
          class="sublevel-nav-link"
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          [routerLink]="[item.routeLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span class="sublevel-link-text" *ngIf="collapsed">{{
            item.label
          }}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sublevel-menu
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          >
          </app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./navegador-lateral.component.scss'],
  animations: [
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      transition('visible <=> hidden', [
        style({ overflow: 'hidden' }),
        animate('{{transitionParams}}'),
      ]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class SublevelMenuComponent {
  @Input() data: TNavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
}

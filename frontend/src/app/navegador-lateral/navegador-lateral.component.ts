import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SublevelMenuComponent } from './sublevel-menu.component';
import { TNavbarData } from './helper';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-navegador-lateral',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SublevelMenuComponent],
  templateUrl: './navegador-lateral.component.html',
  styleUrls: ['./navegador-lateral.component.scss'],
})
export class NavegadorLateralComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    const hamburgerButton = document.querySelector('.icon-button');
    if (hamburgerButton) {
      if (!this.collapsed) {
        hamburgerButton.classList.add('open');
      } else {
        hamburgerButton.classList.remove('open');
      }
    }
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  openSidenav(): void {
    const hamburgerButton = document.querySelector('.icon-button');
    if (hamburgerButton) {
      if (!this.collapsed) {
        hamburgerButton.classList.add('open');
      } else {
        hamburgerButton.classList.remove('open');
      }
    }
    this.collapsed = true;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: TNavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
}

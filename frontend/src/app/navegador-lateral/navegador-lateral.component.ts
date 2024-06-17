import {
  Component,
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
        // Adiciona a classe para mostrar a navbar e rotaciona o ícone
        hamburgerButton.classList.add('open');
      } else {
        // Remove a classe para ocultar a navbar e rotaciona o ícone de volta
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
    console.log(item);
    console.log(!this.multiple);
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        console.log('entrou no for');
        if (item !== modelItem && modelItem.expanded) {
          console.log('entrou no if mais longo');
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
}

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true,
})
export class CurrencyMaskDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Meta',
      'Control',
      'Alt',
      'Shift',
      'Enter',
      'Escape',
    ];

    if (
      allowedKeys.includes(event.key) ||
      (event.key === ',' && !this.el.value.includes(',')) ||
      event.key === 'Dead'
    ) {
      return;
    }

    if (event.key.match(/[^0-9]/)) {
      event.preventDefault();
    }
  }
}

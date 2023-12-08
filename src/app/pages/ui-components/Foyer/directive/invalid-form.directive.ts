

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInvalidForm]'
})
export class InvalidFormDirective {
  private _appInvalidForm: boolean | null = null;

  @Input() set appInvalidForm(condition: boolean | null) {
    this._appInvalidForm = condition;
    this.updateBorderColor();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private updateBorderColor() {
    if (this._appInvalidForm === true || this._appInvalidForm === null) {
      this.renderer.setStyle(this.el.nativeElement, 'border-color', 'red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-color');
    }
  }
}

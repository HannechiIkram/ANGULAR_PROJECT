// invalid-form-button-color.directive.ts

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInvalidFormButtonColor]'
})
export class InvalidFormButtonColorDirective {
  @Input('appInvalidFormButtonColor') set isInvalid(value: boolean | null) {
    const color = value === true ? 'red' : 'green';
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}

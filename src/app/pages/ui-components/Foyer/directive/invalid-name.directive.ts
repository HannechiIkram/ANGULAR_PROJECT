// invalid-name.directive.ts

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInvalidName]'
})
export class InvalidNameDirective {
  @Input('appInvalidName') set isValid(value: boolean) {
    if (!value) {
      this.renderer.setStyle(this.el.nativeElement, 'border-color', 'red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-color');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}

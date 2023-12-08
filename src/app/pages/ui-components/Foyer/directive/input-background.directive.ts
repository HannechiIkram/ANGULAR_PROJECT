// input-background.directive.ts

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputBackground]'
})
export class InputBackgroundDirective {
  @Input('appInputBackground') set isValid(value: boolean) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'green');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}

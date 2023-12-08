// my-button-color.directive.ts
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMyButtonColor]'
})
export class MyButtonColorDirective {

 
    
      constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'orange');
        // Vous pouvez également personnaliser d'autres styles ici si nécessaire
      }
    
}

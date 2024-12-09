import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNonRendu]',
  standalone: true
})
export class NonRenduDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'rgba(255, 0, 0, 0.7)';
  }

}
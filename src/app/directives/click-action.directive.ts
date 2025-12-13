import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appClickAction]',
  standalone: true,
})
export class ClickActionDirective {
  logMessage = input('Click detectado en el componente');
  @HostListener('click')
  log() {
    console.log(this.logMessage());
  }
}

import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appMyClick]'
})
export class ClickDirective {
  @HostBinding('class.clicked') isClicked = false;

  @HostListener('click', ['$event'])
  onClick(e) {
    console.log(e);
    this.isClicked = true;
  }
}

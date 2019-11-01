import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cleanSpecialChars]'
})
export class SpecialCharacterDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onKeyPress(event: KeyboardEvent) {
    this.replaceKeys();
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    setTimeout(() => {
      this.replaceKeys();
      event.preventDefault();
    }, 100);
  }

  private replaceKeys() {
    let value: string = this.el.nativeElement.value;

    // replace all double spaces
    value = value.replaceAll('  ', ' ');

    // then first all lowercase, then camel case the first letters
    value = value.toLocaleLowerCase();
    const capitalize = words =>
      words
        .split(' ')
        .map(w => w.substring(0, 1).toUpperCase() + w.substring(1))
        .join(' ');
    value = capitalize(value);

    value = value.replace(/[^a-zA-Z .]+/g, '');
    this.el.nativeElement.value = value;
  }
}

declare global {
  interface String {
    replaceAll(search, replacement): string;
  }
}

String.prototype.replaceAll = function(search: string, replacement: string) {
  const target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

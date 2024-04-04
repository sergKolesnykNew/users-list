import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCustomValidation]',
})
export class CustomValidationDirective {
  get inputs(): HTMLElement[] {
    return Array.from(this.el.nativeElement);
  }

  constructor(private readonly el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const targetIndex = this.inputs.findIndex((item) => item === target);
    const parentElement = this.inputs[targetIndex]?.parentElement;
    const inputType = target.getAttribute('type');

    if (inputType === 'password') {
      this.passwordValidation(parentElement, target.value, target);

      return;
    }

    if (inputType === 'email') {
      this.mailValidation(parentElement, target);

      return;
    }

    if (inputType === 'select') {
      if (target.value.length === 0) {
        this.showErrorState(parentElement, target, 'Required field');
      } else {
        this.hideErrorState(parentElement);
      }

      return;
    }

    if (target.classList.contains('ng-invalid')) {
      this.showErrorState(parentElement, target, 'Required field');
    } else {
      this.hideErrorState(parentElement);
    }
  }

  passwordValidation(parentElement: HTMLElement | null, value: string, target: HTMLInputElement): void {
    const regex = /^(?=.*\d)(?=.*[a-z]).{8,}$/;

    if (regex.test(value)) {
      this.hideErrorState(parentElement);
    } else {
      let message = 'Error message';

      if (value.length === 0) {
        this.showErrorState(parentElement, target, 'Required field');

        return;
      }

      if (!/^[a-zA-Z0-9]$/.test(value)) {
        message = 'Password should have at least 1 letter';
      }

      if (!/^[Z0-9]+$/.test(value)) {
        message = 'Password should have at least 1 number';
      }

      if (value.length < 8) {
        message = 'Password should have at least 8 symbols';
      }

      this.showErrorState(parentElement, target, message);
    }
  }

  mailValidation(
    parentElement: HTMLElement | null,
    target: HTMLInputElement
  ): void {
    if (target.value.length === 0) {
      this.showErrorState(parentElement, target, 'Required field');

      return;
    }

    if (target.classList.contains('ng-invalid')) {
      this.showErrorState(parentElement, target, 'Not valid email');
    } else {
      this.hideErrorState(parentElement);
    }
  }

  showErrorState(
    parentElement: HTMLElement | null,
    target: HTMLInputElement,
    message: string = 'Error message',
  ): void {
    const errorMessages = parentElement?.querySelectorAll('.error-message');

    if (errorMessages?.length) {
      errorMessages.forEach((errorMessage) => {
        this.renderer.removeChild(parentElement, errorMessage);
      });
    }

    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(message);

    this.renderer.addClass(span, 'error-message');
    this.renderer.addClass(target, 'validation-error');
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(parentElement, span);
  }

  hideErrorState(parentElement: HTMLElement | null): void {
    const errorMessage = parentElement?.querySelector('.error-message');

    if (errorMessage) {
      this.renderer.removeChild(parentElement, errorMessage);
    }
  }
}

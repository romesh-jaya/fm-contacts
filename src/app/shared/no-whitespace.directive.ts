import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[noWhitespace]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        const isWhitespace = (control.value || '').trim().length === 0;
        return isWhitespace ? { 'whitespace': true } : null;
    }
}
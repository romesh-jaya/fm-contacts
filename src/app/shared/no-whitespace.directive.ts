import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

/* eslint-disable @typescript-eslint/no-use-before-define */
@Directive({
    selector: '[conNoWhitespace]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
/* eslint-enable @typescript-eslint/no-use-before-define */
export class NoWhitespaceDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        const isWhitespace = (control.value || '').trim().length === 0;
        return isWhitespace ? { whitespace: true } : null;
    }
}

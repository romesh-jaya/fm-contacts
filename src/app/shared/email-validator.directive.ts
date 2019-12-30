import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

/* eslint-disable @typescript-eslint/no-use-before-define */
@Directive({
    selector: '[conEmailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
/* eslint-enable @typescript-eslint/no-use-before-define */
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {

        const createRegExp = (str) => new RegExp(str.raw[0].replace(/\s/gm, ''));

        // Regex taken from http://emailregex.com/
        const EMAIL_REGEXP = createRegExp`
            ^(([^<>()\[\]\\.,;:\s@"]+(\.[^ <>() \[\]\\.,;: \s@"]+)*)|
            (".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|
            (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`;

        if (control.value && !EMAIL_REGEXP.test(control.value)) {
            return { emailInvalid: true };
        }

        return null;
    }
}

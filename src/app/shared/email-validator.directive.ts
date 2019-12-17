import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[emailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {

        //Regex taken from http://emailregex.com/
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^ <>() \[\]\\.,;: \s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (control.value && !EMAIL_REGEXP.test(control.value)) {
            return { "emailInvalid": true };
        }

        return null;
    }
}
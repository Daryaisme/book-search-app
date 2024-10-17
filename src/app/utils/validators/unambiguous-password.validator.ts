import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const unambiguousPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	console.log('control.value: ', control.value)

	const password = control.get('password')?.value;
	const repeatPassword = control.get('repeatPassword')?.value;

	return password && repeatPassword && password === repeatPassword ? null : { unambiguousPassword: true }
}

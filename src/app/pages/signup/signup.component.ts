import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TuiButton, TuiError, TuiIcon, TuiLabel, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { TuiValidationError } from '@taiga-ui/cdk';
import { AuthService } from '../../services/auth.service';
import { unambiguousPasswordValidator } from '../../utils/validators/unambiguous-password.validator';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		TuiButton,
		TuiIcon,
		TuiLabel,
		TuiPassword,
		TuiTextfieldComponent,
		TuiTextfieldDirective,
		RouterLink,
		TuiError,
		TuiFieldErrorPipe,
		AsyncPipe
	],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
	userNameError!: TuiValidationError | null;
	passwordError!: TuiValidationError | null;
	repeatPasswordError!: TuiValidationError | null;

	signupForm = new FormGroup({
		userName: new FormControl('', [ Validators.required, Validators.pattern('[A-Za-z0-9]+'), Validators.minLength(3) ]),
		password: new FormControl('', [ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*'), Validators.minLength(8) ]),
		repeatPassword: new FormControl('', Validators.required),
	}, unambiguousPasswordValidator);

	constructor(private authService: AuthService, private router: Router) {
	}

	onSignupFormSubmit() {
		if (this.signupForm.valid) {
			// this.authService.login();
			this.router.navigateByUrl('/work-place/home');
		}
	}

	ngOnInit(): void {
		this.signupForm
			.statusChanges
			.subscribe(() => {
				this.setUserNameError(this.signupForm.controls.userName.errors);
				this.setPasswordError(this.signupForm.controls.password.errors);
				this.setRepeatPasswordError(this.signupForm.controls.repeatPassword.errors);
			})
	}

	setUserNameError(errors: ValidationErrors | null) {
		if (errors?.['required']) {
			this.userNameError = new TuiValidationError('Поле обязательно')
		} else if (errors?.['pattern']) {
			this.userNameError = new TuiValidationError('username может включать в себя только буквы латинского алфавита и цифры')
		} else if (errors?.['minlength']) {
			this.userNameError = new TuiValidationError('Введено менеее 3 символов')
		} else {
			this.userNameError = null;
		}
	}

	setPasswordError(errors: ValidationErrors | null) {
		if (errors?.['required']) {
			this.passwordError = new TuiValidationError('Поле обязательно')
		} else if (errors?.['pattern']) {
			this.passwordError = new TuiValidationError('Пароль должен содержать минимум одну прописную и заглавную букву латинского алфавита, а также цифру')
		} else if (errors?.['minlength']) {
			this.passwordError = new TuiValidationError('Введено менеее 8 символов')
		} else {
			this.passwordError = null;
		}
	}

	setRepeatPasswordError(errors: ValidationErrors | null) {
		if (errors?.['required']) {
			this.repeatPasswordError = new TuiValidationError('Поле обязательно')
		} else if (this.signupForm.errors?.['unambiguousPassword']) {
			this.repeatPasswordError = new TuiValidationError('Пароли должны совпадать')
		} else {
			this.repeatPasswordError = null;
		}
	}
}

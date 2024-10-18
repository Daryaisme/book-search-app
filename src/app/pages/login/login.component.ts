import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	TuiAlertService,
	TuiButton,
	TuiIcon,
	TuiLabel,
	TuiTextfield,
	TuiTextfieldComponent,
	TuiTextfieldDirective,
	TuiTitle
} from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { TuiPassword } from '@taiga-ui/kit';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
import { showNotification } from '../../utils/helpers/notification.helper';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		TuiTextfield,
		TuiLabel,
		TuiTextfieldDirective,
		TuiPassword,
		TuiTextfieldComponent,
		TuiIcon,
		TuiButton,
		TuiTitle,
		RouterLink
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	loginForm = new FormGroup({
		userName: new FormControl('', [ Validators.required ]),
		password: new FormControl('', [ Validators.required ]),
	})

	constructor(
		private authService: AuthService,
		private router: Router,
		private alerts: TuiAlertService
	) {
	}

	onLoginFormSubmit() {
		tuiMarkControlAsTouchedAndValidate(this.loginForm);

		if (this.loginForm.valid) {
			const { userName, password } = this.loginForm.controls;

			const user: User = {
				userName: userName.value || '',
				password: password.value || ''
			}

			this.authService.login(user);
			this.router.navigateByUrl('/work-place/home');
		} else showNotification(this.alerts, 'Check your login and password', 'Error!')
	}
}

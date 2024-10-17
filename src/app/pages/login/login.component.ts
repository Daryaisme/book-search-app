import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	TuiButton,
	TuiIcon,
	TuiLabel,
	TuiTextfield,
	TuiTextfieldComponent,
	TuiTextfieldDirective, TuiTitle
} from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../types/user';

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

	constructor(private authService: AuthService, private router: Router) {
	}

	onLoginFormSubmit() {
		if (this.loginForm.valid) {
			const { userName, password } = this.loginForm.controls;

			const user: User = {
				userName: userName.value || '',
				password: password.value || ''
			}

			this.authService.login(user);
			this.router.navigateByUrl('/work-place/home');
		}
	}
}

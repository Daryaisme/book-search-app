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

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ ReactiveFormsModule, TuiTextfield, TuiLabel, TuiTextfieldDirective, TuiPassword, TuiTextfieldComponent, TuiIcon, TuiButton, TuiTitle, RouterLink ],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	loginForm = new FormGroup({
		username: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
		password: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
	})

	constructor(private authService: AuthService, private router: Router) {
	}

	onLoginFormSubmit() {
		if (this.loginForm.valid) {
			this.authService.login();
			this.router.navigateByUrl('/home');
		}
	}
}

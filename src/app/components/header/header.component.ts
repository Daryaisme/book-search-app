import { Component, Input } from '@angular/core';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiTitle } from '@taiga-ui/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [ TuiHeader, TuiButton, TuiTitle ],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	@Input() userName!: string | null;

	constructor(private authService: AuthService, private router: Router) {}

	handleLogoutButtonClick() {
		this.authService.logout();

		this.router.navigateByUrl('/auth/login');
	}
}

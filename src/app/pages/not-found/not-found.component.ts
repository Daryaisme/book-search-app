import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../store/auth/auth.state';

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [
		TuiButton
	],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
	authStatus = this.store.selectSignal(AuthState.getAuthStatus);

	constructor(private store: Store, private router: Router) {
	}

	handleHomePageButtonClick() {
		this.router.navigateByUrl(this.authStatus() ? '/work-place/home' : 'auth/login')
	}
}

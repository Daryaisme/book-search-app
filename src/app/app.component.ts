import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { Store } from '@ngxs/store';
import { AuthActions } from './store/auth/auth.actions';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ RouterOutlet, TuiRoot, HeaderComponent ],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	constructor(private authService: AuthService, private store: Store) {
		const user = this.authService.getUser();

		this.store.dispatch(new AuthActions.SetUser({
			userName: user?.userName ?? null,
			sessionToken: user?.sessionToken ?? null
		}))
	}
}

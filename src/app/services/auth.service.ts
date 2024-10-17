import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Store } from '@ngxs/store';
import { AuthActions } from '../store/auth/auth.actions';

const users: User[] = [
	{
		userName: 'darya',
		password: 'qwerty123',
	},
	{
		userName: 'olga',
		password: 'qwerty321',
	}
]

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private store: Store) {
	}

	login(user: User) {
		const isUserSignedUp = users.some(el => JSON.stringify(el) === JSON.stringify(user));

		if (isUserSignedUp) {
			localStorage.setItem('username', user.userName);
			localStorage.setItem('sessionToken', '1');

			this.store.dispatch(new AuthActions.LogIn(user.userName));
		}
	}

	logout() {
		localStorage.removeItem('username');
		localStorage.removeItem('sessionToken');

		this.store.dispatch(new AuthActions.LogOut())
	}
}

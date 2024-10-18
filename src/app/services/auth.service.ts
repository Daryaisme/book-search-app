import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Store } from '@ngxs/store';
import { AuthActions } from '../store/auth/auth.actions';
import { TuiAlertService } from '@taiga-ui/core';
import { showNotification } from '../utils/helpers/notification.helper';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	users: User[] = JSON.parse(localStorage.getItem('users') ?? '[]');

	constructor(private store: Store, private alerts: TuiAlertService) {
	}

	getUser() {
		const sessionToken = localStorage.getItem('sessionToken');

		return this.users.find((user) => user.sessionToken === sessionToken);
	}

	login(user: User) {
		const registeredUser = this.users.find(({
			userName,
			password
		}) => userName === user.userName && password === user.password);

		if (registeredUser) {
			localStorage.setItem('sessionToken', registeredUser.sessionToken ?? '');

			this.store.dispatch(new AuthActions.SetUser({
				userName: registeredUser.userName,
				sessionToken: registeredUser.sessionToken ?? ''
			}));
		} else showNotification(this.alerts, 'Check your login and password', 'Error!')
	}

	signup(user: User): boolean {
		const isUserSignedUp = this.users.some(el => el.userName === user.userName);

		if (!isUserSignedUp) {
			const updatedUsers = [ ...this.users, { ...user, sessionToken: Date.now().toString() } ]

			this.users = updatedUsers;
			localStorage.setItem('users', JSON.stringify(updatedUsers));

			return true;
		} else {
			showNotification(this.alerts, 'User with such name is already registered. Choose another one', 'Error!');

			return false;
		}
	}

	logout() {
		localStorage.removeItem('sessionToken');

		this.store.dispatch(new AuthActions.LogOut())
	}
}

import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth.service';

export interface AuthStateModel {
	userName: string | null;
	sessionToken: string | null;
}

@State<AuthStateModel>({
	name: 'auth',
	defaults: {
		userName: localStorage.getItem('username') || null,
		sessionToken: localStorage.getItem('sessionToken') || null,
	},
})
@Injectable()
export class AuthState {
	constructor(private authService: AuthService) {
	}

	@Selector()
	static getUserName(state: AuthStateModel) {
		return state.userName;
	}

	@Selector()
	static getSessionToken(state: AuthStateModel) {
		return state.sessionToken;
	}

	@Selector()
	static getAuthStatus(state: AuthStateModel) {
		return !!state.sessionToken;
	}

	@Action(AuthActions.LogIn)
	login(
		ctx: StateContext<AuthStateModel>,
		{ payload: userName }: AuthActions.LogIn
	) {
		ctx.setState({ userName: userName, sessionToken: '1' });
	}

	@Action(AuthActions.LogOut)
	logout(ctx: StateContext<AuthStateModel>) {
		ctx.setState({ userName: null, sessionToken: null });
	}
}

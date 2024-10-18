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
		userName: null,
		sessionToken: null,
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

	@Action(AuthActions.SetUser)
	setUser(
		ctx: StateContext<AuthStateModel>,
		{ payload: { userName, sessionToken } }: AuthActions.SetUser
	) {
		ctx.setState({ userName, sessionToken });
	}

	@Action(AuthActions.LogOut)
	logout(ctx: StateContext<AuthStateModel>) {
		ctx.setState({ userName: null, sessionToken: null });
	}
}

export namespace AuthActions {
	export class SetUser {
		static readonly type = '[Auth] Set user';

		constructor(public payload: { userName: string | null, sessionToken: string | null }) {
		}
	}

	export class LogOut {
		static readonly type = '[Auth] Log out';
	}
}
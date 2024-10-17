export namespace AuthActions {
  export class LogIn {
    static readonly type = '[Auth] Log in';

    constructor(public payload: string) {}
  }

  export class LogOut {
    static readonly type = '[Auth] Log out';
  }
}
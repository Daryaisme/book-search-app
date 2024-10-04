export namespace SelectedBookActions {
  export class UpdateKey {
    static readonly type = '[SelectedBook] UpdateKey';

    constructor(public payload: string) {}
  }
}

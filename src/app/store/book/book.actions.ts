export namespace BookActions {
  export class UpdateList {
    static readonly type = '[Book] UpdateList';

    constructor(public payload: string) {}
  }

  export class UpdatePage {
    static readonly type = '[Pagination] UpdatePage';

    constructor(public payload: number) {}
  }
}

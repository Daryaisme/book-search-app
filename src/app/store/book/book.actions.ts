export namespace BookActions {
  export class UpdateList {
    static readonly type = '[BookList] UpdateByValue';

    constructor(public payload: string) {}
  }

  export class UpdatePage {
    static readonly type = '[BookList] UpdateByPage';

    constructor(public payload: number) {}
  }
}

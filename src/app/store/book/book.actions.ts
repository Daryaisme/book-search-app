export namespace BookActions {
  export class GetList {
    static readonly type = '[Book] GetList';

    constructor(public searchValue: string) {}
  }
}

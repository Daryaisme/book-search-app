import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { BookActions } from './book.actions';
import { Book } from '../../types/book';
import { BookService } from '../../services/book.service';

export interface BookStateModel {
  books: Book[];
  total: number;
  page: number;
  limit: number;
}

@State<BookStateModel>({
  name: 'book',
  defaults: {
    books: [],
    total: 0,
    page: 1,
    limit: 10,
  },
})
@Injectable()
export class BookState {
  private _bookService = inject(BookService);

  @Selector()
  static getBooks(state: BookStateModel) {
    console.log('Current state:', state);

    return state.books;
  }

  @Action(BookActions.GetList)
  getList(
    ctx: StateContext<BookStateModel>,
    { searchValue }: BookActions.GetList
  ) {
    const { page, limit } = ctx.getState();

    this._bookService.getList(searchValue, page, limit).subscribe((result) =>
      ctx.patchState({
        books: result.items,
        total: result.totalItems,
      })
    );
  }

  // @Action(BookActions.GetList)
  // add(ctx: StateContext<BookStateModel>) {
  //   const stateModel = ctx.getState();
  //   stateModel.books = [...stateModel.books, payload];
  //   ctx.setState(stateModel);
  // }
}

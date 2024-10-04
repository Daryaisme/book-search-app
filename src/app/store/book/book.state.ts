import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { BookActions } from './book.actions';
import { BookService } from '../../services/book.service';
import { Book } from '../../types/book';

export interface BookStateModel {
  books: Book[];
  total: number;
  searchString: string;
  page: number;
  limit: number;
}

@State<BookStateModel>({
  name: 'book',
  defaults: {
    books: [],
    total: 0,
    searchString: '',
    page: 1,
    limit: 10,
  },
})
@Injectable()
export class BookState {
  constructor(private bookService: BookService) {}

  @Selector()
  static getBooks(state: BookStateModel) {
    console.log('Current state:', state);

    return { books: state.books, total: state.total, page: state.page };
  }

  @Action(BookActions.UpdateList)
  updateList(
    ctx: StateContext<BookStateModel>,
    { payload: searchValue }: BookActions.UpdateList
  ) {
    const { page, limit } = ctx.getState();

    this.bookService.getList(searchValue, page, limit).subscribe((results) =>
      ctx.patchState({
        books: results.docs,
        total: results.numFound,
        searchString: searchValue,
        page: 1,
      })
    );
  }

  @Action(BookActions.UpdatePage)
  updatePage(
    ctx: StateContext<BookStateModel>,
    { payload: index }: BookActions.UpdatePage
  ) {
    const { limit, searchString } = ctx.getState();
    const newPage = index + 1;

    this.bookService.getList(searchString, newPage, limit).subscribe((results) =>
      ctx.patchState({
        books: results.docs,
        total: results.numFound,
        page: newPage,
      })
    );
  }
}

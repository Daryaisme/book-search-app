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
  isLoading: boolean;
}

@State<BookStateModel>({
  name: 'book',
  defaults: {
    books: [],
    total: 0,
    searchString: '',
    page: 1,
    limit: 10,
    isLoading: false,
  },
})
@Injectable()
export class BookState {
  constructor(private bookService: BookService) {}

  @Selector()
  static getBooks(state: BookStateModel) {
    return state.books;
  }

  @Selector()
  static getTotalBooksCount(state: BookStateModel) {
    return state.total;
  }

  @Selector()
  static getCurrentPage(state: BookStateModel) {
    return state.page;
  }

  @Selector()
  static getBooksLoadingStatus(state: BookStateModel) {
    return state.isLoading;
  }

  @Action(BookActions.UpdateList)
  updateList(
    ctx: StateContext<BookStateModel>,
    { payload: searchValue }: BookActions.UpdateList
  ) {
    const { page, limit } = ctx.getState();

    ctx.patchState({ isLoading: true });

    this.bookService.getList(searchValue, page, limit).subscribe((results) =>
      ctx.patchState({
        books: results.docs,
        total: results.numFound,
        searchString: searchValue,
        page: 1,
        isLoading: false,
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

    ctx.patchState({ isLoading: true });

    this.bookService
      .getList(searchString, newPage, limit)
      .subscribe((results) =>
        ctx.patchState({
          books: results.docs,
          total: results.numFound,
          page: newPage,
          isLoading: false,
        })
      );
  }
}

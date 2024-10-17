import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SelectedBookActions } from './selected-book.actions';
import { BookService } from '../../services/book.service';
import { DetailedBook } from '../../types/book';

export interface SelectedBookStateModel {
	key: string;
	book: DetailedBook;
	isLoading: boolean;
}

@State<SelectedBookStateModel>({
	name: 'selectedBook',
	defaults: {
		key: '',
		book: {} as DetailedBook,
		isLoading: false,
	},
})
@Injectable()
export class SelectedBookState {
	constructor(private bookService: BookService) {
	}

	@Selector()
	static getBook(state: SelectedBookStateModel) {
		return state.book;
	}

	@Selector()
	static getBookLoadingStatus(state: SelectedBookStateModel) {
		return state.isLoading;
	}

	@Action(SelectedBookActions.UpdateKey)
	updateKey(
		ctx: StateContext<SelectedBookStateModel>,
		{ payload: newKey }: SelectedBookActions.UpdateKey
	) {
		const { key } = ctx.getState();

		if (key !== newKey) {
			ctx.patchState({ isLoading: true });

			this.bookService.get(newKey).subscribe((results) => {
				ctx.patchState({ key: newKey, book: results, isLoading: false });
			});
		}
	}
}

import { Component } from '@angular/core';
import { TuiDialog, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { Store } from '@ngxs/store';
import { SelectedBookState } from '../../store/selected-book/selected-book.state';
import { DetailedBook } from '../../types/book';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [TuiDialog, TuiCardLarge, TuiLoader, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [tuiLoaderOptionsProvider({ size: 'm' })],
})
export class ModalComponent {
  book: DetailedBook = {} as DetailedBook;
  isLoading: boolean = true;

  constructor(private store: Store) {
    this.store.select(SelectedBookState.getBook).subscribe((results) => {
      this.book = results.book;
      this.isLoading = results.isLoading;
    });
  }
}

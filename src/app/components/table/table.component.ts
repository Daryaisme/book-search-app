import { Component, OnInit } from '@angular/core';
import { tuiFadeIn, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiTable } from '@taiga-ui/addon-table';
import { Store } from '@ngxs/store';
import { BookActions } from '../../store/book/book.actions';
import { BookState } from '../../store/book/book.state';
import { Book } from '../../types/book';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TuiTable, TuiPagination, TuiLoader],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [tuiFadeIn],
  providers: [tuiLoaderOptionsProvider({ size: 'xl' })],
})
export class TableComponent implements OnInit {
  books: Book[] = [];
  length: number = 1;
  isLoading: boolean = true;
  index = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.store.select(BookState.getBooks).subscribe((results) => {
      this.books = results.books;
      this.length = Math.ceil(results.total / 10);
      this.index = results.page - 1;
      this.isLoading = false;
    });
  }

  handlePaginationButtonClick(index: number): void {
    this.isLoading = true;

    this.store.dispatch(new BookActions.UpdatePage(index));
  }
}

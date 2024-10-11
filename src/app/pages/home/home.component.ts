import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { BannerComponent } from '../../components/banner/banner.component';
import { TableComponent } from '../../components/table/table.component';
import { TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { BookState } from '../../store/book/book.state';
import { BookActions } from '../../store/book/book.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, TableComponent, TuiLoader],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [tuiLoaderOptionsProvider({ size: 'xl' })],
})
export class HomeComponent {
  books = this.store.selectSignal(BookState.getBooks);
  totalBooksCount = this.store.selectSignal(BookState.getTotalBooksCount);
  currentPage = this.store.selectSignal(BookState.getCurrentPage);
  isBooksLoading = this.store.selectSignal(BookState.getBooksLoadingStatus);

  constructor(private store: Store) {}

  get totalPages(): number {
    return Math.ceil(this.totalBooksCount() / 10);
  }

  onBookSearchChange(value: string) {
    this.store.dispatch(new BookActions.UpdateList(value));
  }
}

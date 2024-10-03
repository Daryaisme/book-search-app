import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { BannerComponent } from '../../components/banner/banner.component';
import { TableComponent } from '../../components/table/table.component';
import { TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { BookState } from '../../store/book/book.state';
import { Book } from '../../types/book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, TableComponent, AsyncPipe, TuiLoader],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [tuiLoaderOptionsProvider({ size: 'xl' })],
})
export class HomeComponent {
  books: Book[] = [];
  length: number = 0;
  index: number = 0;
  isLoading: boolean = false;

  constructor(private store: Store) {
    this.store.select(BookState.getBooks).subscribe((results) => {
      this.books = results.books;
      this.length = Math.ceil(results.total / 10);
      this.index = results.page - 1;
      this.isLoading = false;
    });
  }

  updateLoadingStatus(status: boolean): void {
    this.isLoading = status;
  }
}

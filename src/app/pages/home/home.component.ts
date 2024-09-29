import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { Book } from '../../types/book';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { Store } from '@ngxs/store';
import { BookState } from '../../store/book/book.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, BookCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _store = inject(Store);

  books$: Observable<Book[]> = this._store.select(BookState.getBooks);
}

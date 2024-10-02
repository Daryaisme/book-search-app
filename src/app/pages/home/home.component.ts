import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { TuiBlockStatus } from '@taiga-ui/layout';
import { BookState } from '../../store/book/book.state';
import { BannerComponent } from '../../components/banner/banner.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, TableComponent, AsyncPipe, TuiBlockStatus],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  totalCount: number = 0;

  constructor(private store: Store) {
    this.store
      .select(BookState.getTotalCount)
      .subscribe((results) => (this.totalCount = results));
  }
}

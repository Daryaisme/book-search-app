import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tuiFadeIn } from '@taiga-ui/core';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiBlockStatus } from '@taiga-ui/layout';
import { Store } from '@ngxs/store';
import { BookActions } from '../../store/book/book.actions';
import { Book } from '../../types/book';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TuiTable, TuiPagination, TuiBlockStatus],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [tuiFadeIn],
})
export class TableComponent {
  @Input() books!: Book[];
  @Input() length!: number;
  @Input() index!: number;
  @Output() changeLoadingStatusEvent = new EventEmitter<boolean>();

  constructor(private store: Store) {}

  handlePaginationButtonClick(index: number): void {
    this.changeLoadingStatusEvent.emit(true);

    this.store.dispatch(new BookActions.UpdatePage(index));
  }
}

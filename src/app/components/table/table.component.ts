import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { TuiDialogService, tuiFadeIn } from '@taiga-ui/core';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiBlockStatus } from '@taiga-ui/layout';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { Store } from '@ngxs/store';
import { ModalComponent } from '../modal/modal.component';
import { BookActions } from '../../store/book/book.actions';
import { SelectedBookActions } from '../../store/selected-book/selected-book.actions';
import { Book } from '../../types/book';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TuiTable, TuiPagination, TuiBlockStatus, ModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [tuiFadeIn],
})
export class TableComponent {
  @Input() books!: Book[];
  @Input() length!: number;
  @Input() index!: number;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  constructor(private store: Store, private dialogs: TuiDialogService) {}

  handlePaginationButtonClick(index: number): void {
    this.store.dispatch(new BookActions.UpdatePage(index));
  }

  handleBookCardClick(key: string): void {
    this.store.dispatch(new SelectedBookActions.UpdateKey(key));

    this.showDialog(this.dialogTemplate);
  }

  showDialog(content: PolymorpheusContent): void {
    this.dialogs.open(content).subscribe();
  }
}

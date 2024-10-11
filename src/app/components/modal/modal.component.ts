import { Component } from '@angular/core';
import { TuiDialog, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { Store } from '@ngxs/store';
import { SelectedBookState } from '../../store/selected-book/selected-book.state';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [TuiDialog, TuiCardLarge, TuiLoader],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [tuiLoaderOptionsProvider({ size: 'm' })],
})
export class ModalComponent {
  book = this.store.selectSignal(SelectedBookState.getBook);
  isBookLoading = this.store.selectSignal(
    SelectedBookState.getBookLoadingStatus
  );

  constructor(private store: Store) {}
}

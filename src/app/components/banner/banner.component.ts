import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiLoader, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngxs/store';
import { BookActions } from '../../store/book/book.actions';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [TuiTitle, TuiTextfield, FormsModule, TuiLoader],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() isLoading: boolean = false;
  @Output() changeLoadingStatusEvent = new EventEmitter<boolean>();

  searchValue: string = '';

  constructor(private store: Store) {}

  handleSearchButtonClick() {
    this.changeLoadingStatusEvent.emit(true);

    this.store.dispatch(new BookActions.UpdateList(this.searchValue));
  }
}

import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TuiLoader, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { BookActions } from '../../store/book/book.actions';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [TuiTitle, TuiTextfield, FormsModule, TuiLoader],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input({ required: true }) heading!: string;
  @Input({ required: true }) subtitle!: string;
  @Input({ required: true }) imgUrl!: string;
  @Input() isSearchable = false;
  @Input() placeholder = '';

  constructor(private store: Store) {}

  searchValue: string = '';

  handleSearchButtonClick() {
    this.store.dispatch(new BookActions.UpdateList(this.searchValue));
  }
}

import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { BookActions } from '../../store/book/book.actions';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [TuiTitle, TuiTextfield, FormsModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  private _store = inject(Store);

  @Input({ required: true }) heading!: string;
  @Input({ required: true }) subtitle!: string;
  @Input({ required: true }) imgUrl!: string;
  @Input() isSearchable = false;
  @Input() placeholder = '';

  searchValue = '';

  add() {
    console.log(this.searchValue);

    this._store.dispatch(new BookActions.GetList(this.searchValue));
  }
}

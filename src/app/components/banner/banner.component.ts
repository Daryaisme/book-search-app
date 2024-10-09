import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiLoader, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngxs/store';
import { debounceTime, switchMap, tap } from 'rxjs';
import { BookActions } from '../../store/book/book.actions';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [TuiTitle, TuiTextfield, TuiLoader, ReactiveFormsModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() isLoading: boolean = false;
  @Output() changeLoadingStatusEvent = new EventEmitter<boolean>();

  searchValue: FormControl<string> = new FormControl('', { nonNullable: true });

  constructor(private store: Store) {
    this.searchValue.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => {
          this.changeLoadingStatusEvent.emit(true);
        }),
        switchMap((value) =>
          this.store.dispatch(new BookActions.UpdateList(value))
        )
      )
      .subscribe();
  }
}

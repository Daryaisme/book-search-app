import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldComponent, TuiTextfieldDirective, TuiTitle } from '@taiga-ui/core';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [TuiTitle, ReactiveFormsModule, TuiTextfieldComponent, TuiTextfieldDirective],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() heading = '';
  @Input() subheading = '';
  @Input() placeholder = '';
  @Output() changeSearchValue = new EventEmitter<string>();
  searchValue = new FormControl<string>('', { nonNullable: true });

  constructor() {
    this.searchValue.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => this.changeSearchValue.emit(value))
      )
      .subscribe();
  }
}

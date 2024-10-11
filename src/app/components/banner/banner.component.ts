import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [TuiTitle, TuiTextfield, ReactiveFormsModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() heading: string = '';
  @Input() subheading: string = '';
  @Input() placeholder: string = '';
  @Output() changeSearchValue = new EventEmitter<string>();
  searchValue: FormControl<string> = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchValue.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => this.changeSearchValue.emit(value))
      )
      .subscribe();
  }
}

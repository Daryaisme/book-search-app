import { Component } from '@angular/core';
import { TuiDialog, TuiLoader, tuiLoaderOptionsProvider, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngxs/store';
import { SelectedBookState } from '../../store/selected-book/selected-book.state';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [ TuiDialog, TuiCardLarge, TuiHeader, TuiTitle, TuiLoader, DatePipe ],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	providers: [ tuiLoaderOptionsProvider({ size: 'm' }) ],
})
export class ModalComponent {
	book = this.store.selectSignal(SelectedBookState.getBook);
	isBookLoading = this.store.selectSignal(
		SelectedBookState.getBookLoadingStatus
	);

	constructor(private store: Store) {
	}
}

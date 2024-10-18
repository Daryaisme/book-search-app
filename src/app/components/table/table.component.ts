import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { TuiDialogService, tuiFadeIn } from '@taiga-ui/core';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { TuiTableDirective, TuiTableTbody, TuiTableTd, TuiTableTh } from '@taiga-ui/addon-table';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiBlockStatusComponent, TuiBlockStatusDirective } from '@taiga-ui/layout';
import { Store } from '@ngxs/store';
import { SelectedBookActions } from '../../store/selected-book/selected-book.actions';
import { BookActions } from '../../store/book/book.actions';
import { ModalComponent } from '../modal/modal.component';
import { Book } from '../../types/book';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [
		ModalComponent,
		TuiTableDirective,
		TuiTableTh,
		TuiTableTbody,
		TuiTableTd,
		TuiPagination,
		TuiBlockStatusComponent,
		TuiBlockStatusDirective
	],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	animations: [ tuiFadeIn ],
})
export class TableComponent {
	@Input() books!: Book[];
	@Input() length!: number;
	@Input() index!: number;

	@ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<PolymorpheusContent>;
	@ViewChild('tableElement') tableElement!: ElementRef;

	constructor(private store: Store, private dialogs: TuiDialogService) {
	}

	handlePaginationButtonClick(index: number): void {
		this.tableElement.nativeElement.scrollIntoView({ behavior: 'smooth'})

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

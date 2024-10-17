import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [
		TuiButton
	],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
	constructor(private router: Router) {
	}

	handleHomePageButtonClick() {
		this.router.navigateByUrl('/work-place/home')
	}
}

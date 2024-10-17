import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';

export const authGuard = (): Observable<boolean> => {
	const store = inject(Store);

	return store.select(AuthState.getAuthStatus);
};

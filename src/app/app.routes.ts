import { Routes } from '@angular/router';
import { AuthorizedLayoutComponent } from './components/layouts/authorized-layout/authorized-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './utils/guards/auth.guard';
import { UnauthorizedLayoutComponent } from './components/layouts/unauthorized-layout/unauthorized-layout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },
	{
		path: 'auth',
		component: UnauthorizedLayoutComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'signup', component: SignupComponent },
		]
	},
	{
		path: 'work-place',
		component: AuthorizedLayoutComponent,
		children: [
			{ path: 'home', component: HomeComponent },
		],
		canActivate: [ authGuard ],
	},
	{ path: '**', component: NotFoundComponent }
];

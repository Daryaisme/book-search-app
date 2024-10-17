import { Routes } from '@angular/router';
import { AuthorizedLayoutComponent } from './components/layouts/authorized-layout/authorized-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './utils/guards/auth.guard';
import { UnauthorizedLayoutComponent } from './components/layouts/unauthorized-layout/unauthorized-layout.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
	{
		path: '',
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
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
];

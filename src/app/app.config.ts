import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { BookState } from './store/book/book.state';
import { SelectedBookState } from './store/selected-book/selected-book.state';
import { AuthState } from './store/auth/auth.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideHttpClient(),
    provideStore([BookState, SelectedBookState, AuthState]),
    provideAnimations(),
  ],
};

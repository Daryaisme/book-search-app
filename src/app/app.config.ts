import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { BookState } from './store/book/book.state';
import { SelectedBookState } from './store/selected-book/selected-book.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideHttpClient(),
    provideStore([BookState, SelectedBookState]),
    provideAnimations(),
  ],
};

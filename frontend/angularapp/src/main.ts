import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app';
import { authInterceptor } from './app/auth.interceptor';

// 👇 Add Chart.js imports
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables); // register all controllers (line, bar, pie, etc.)

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
});

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app';

// 👇 Add Chart.js imports
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables); // register all controllers (line, bar, pie, etc.)

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
});



// // import { bootstrapApplication } from '@angular/platform-browser';
// // import { provideHttpClient, withFetch } from '@angular/common/http';
// // import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Import from Angular
// // import { AppComponent } from './app/app.component';
// // import { appConfig } from './app/app.config';

// // bootstrapApplication(AppComponent, {
// //   ...appConfig,
// //   providers: [
// //     ...appConfig.providers,
// //     provideAnimations(),  // To enable animations
// //     provideHttpClient(withFetch())  // To enable fetch for HttpClient
// //   ]
// // }).catch((err) => console.error(err));



// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { provideRouter, RouterModule } from '@angular/router';
// import { StockHistoryComponent } from './app/stock-history/stock-history.component';

// // Bootstrapping the app with router and necessary providers
// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...appConfig.providers,
//     provideAnimations(),  // Enabling animations
//     provideHttpClient(withFetch())  // Enabling Fetch for HTTP requests
//   ]
// }).catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { StockHistoryComponent } from './app/stock-history/stock-history.component'; // Correct the import path based on your project structure

// Define the routes for the application
const routes = [
  {
    path: 'stock-history',
    component: StockHistoryComponent,
  },
  // Add additional routes as needed
];

// Bootstrapping the application with router, HTTP client, animations, and necessary providers
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),  // Enabling animations
    provideHttpClient(withFetch()),  // Enabling Fetch for HTTP requests
    provideRouter(routes)  // Providing routing configuration
  ],
}).catch((err) => console.error('Application bootstrap failed:', err));

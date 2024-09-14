import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './services/authentication/custom.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([customInterceptor])),
    provideFirebaseApp(() => initializeApp({"projectId":"maintenance-management-3acf3","appId":"1:1065254411207:web:47fb4954028420e203d7e2","storageBucket":"maintenance-management-3acf3.appspot.com","apiKey":"AIzaSyAw4_TrXZ53m3LijnTaaH55kwxRk_qPER8","authDomain":"maintenance-management-3acf3.firebaseapp.com","messagingSenderId":"1065254411207"})), provideStorage(() => getStorage()),
    provideAnimationsAsync()
  ]
};
 
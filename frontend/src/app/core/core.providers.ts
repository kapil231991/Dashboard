import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { timingInterceptor } from './auth/timing.interceptor';

export const CORE_PROVIDERS = [
  provideHttpClient(
    withInterceptors([authInterceptor, timingInterceptor])
  ),
];

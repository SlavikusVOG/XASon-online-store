import { InjectionToken } from '@angular/core';
import { AuthService } from '@core/auth';

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>('AuthService');

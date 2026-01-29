import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service';

export const authGuard: CanActivateChildFn = () => {

    console.log('AuthGuard#canActivate called');

    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};

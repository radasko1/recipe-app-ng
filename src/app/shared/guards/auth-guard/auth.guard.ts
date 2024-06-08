import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuthenticated()
    .pipe(
      map((authenticated) => {
        // whether is authenticated, allow user continue
        if (authenticated) {
          return true;
        }

        // whether is not authenticated, redirect to the root page
        return router.createUrlTree(['/']);
      })
    );
};

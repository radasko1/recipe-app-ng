import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";

export const AdminAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthService).hasAdminPermission();
  // return true;
};

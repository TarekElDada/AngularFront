import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  // injection par programme (au lieu de le faire dans
  // le constructeur d'un composant)
  let authService = inject(AuthService);
  let router = inject(Router);
  // si ça renvoie true, alors, on peut activer la route return authService.isAdmin()
  return authService.isLoggedPromise()
    .then((authentifie: boolean) => {
      if (authentifie) {
        return true;
      } else {
        console.log("Vous n'êtes pas connecté! Navigation refusée !");
        // et on retourne vers la page d'accueil
        router.navigate(["/login"]);
        return false;
      }
    })
};
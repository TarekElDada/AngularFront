import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSlideToggleModule, FormsModule, AssignmentsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css']
})
export class AppComponent {
  opened: boolean = false;
  title = 'Application de gestion de devoirs';
  snackBar = inject(MatSnackBar);

  constructor(public authService: AuthService, private assignmentsService: AssignmentsService, private router: Router) { }

  isAuthentificated(): boolean {
    return this.authService.isLogged();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE - AFFICHE LA LISTE");
        // replaceUrl = true = force le refresh, même si
        // on est déjà sur la page d’accueil
        // Marche plus avec la dernière version d’angular
        //this.router.navigate(["/home"], {replaceUrl:true});
        // ceci marche….
        window.location.reload();
      })
  }

}

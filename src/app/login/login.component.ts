import { Component, inject } from '@angular/core';
import { User } from './user.model';
import { OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles.css']
})
export class LoginComponent implements OnInit {
  user!: User;
  loginInput: string = '';
  passwordInput: string = '';
  snackBar = inject(MatSnackBar);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit() {
    this.user.login = this.loginInput;
    this.user.password = this.passwordInput;
    const isAuthentificated = this.authService.authentificate(this.user);

    if (isAuthentificated) {
      this.router.navigate(['/home']);
      this.snackBar.open("Vous êtes connecté", "Fermer", { duration: 3000 });
    } else {
      this.snackBar.open("Erreur de connexion", "Fermer", { duration: 3000 });
    }
  }
}
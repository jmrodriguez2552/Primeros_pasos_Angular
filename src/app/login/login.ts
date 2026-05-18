import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = "";
  password = "";
  errorMessage = "";

  constructor(private auth :Auth, private router: Router){}

  onLogin(): void {
    const success = this.auth.login(this.username, this.password);
    if (success) {
      this.router.navigate(["/dashboard"]);
    }else {
      this.errorMessage = "Usuario o contraseña incorrectos";
    }
  }
}

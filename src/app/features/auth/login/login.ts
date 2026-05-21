import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = "";
  password = "";
  errorMessage = "";

  constructor(private auth :Auth, private router: Router){}

  onLogin(): void {

     // Limpiamos mensajes de error previos
    this.errorMessage = "";

    // Validamos campos vacíos antes de lanzar la petición HTTP
    if (!this.email || !this.password) {
      this.errorMessage = "Por favor, rellena todos los campos.";
      return;
    }

    // Llamamos al servicio asíncrono y nos suscribimos al resultado
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        const role = this.auth.getUserRole();
        if(role === 'admin'){
          this.router.navigate(["/dashboard"]);
        }else{
          this.router.navigate(["/home"]);
        }
        
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = "Email o contraseña incorrectos.";
        } else {
          this.errorMessage = "Error de conexión con el servidor de la API.";
        }
      }
    });
  }
}

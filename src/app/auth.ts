import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { generarTokenSimulado, UserPayload  } from './utils';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private loggedIn = false;
  private platformId = inject(PLATFORM_ID);

  login(username: String, password: String): boolean {
    if (username === "admin" && password === "admin123") {
      this.loggedIn = true;
      const datosUsuario: UserPayload = {
        id: "user_5",
        email: "admin@ejemplo.com",
        role: "Administrador"
      };

      const tokenJWT = generarTokenSimulado(datosUsuario);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem("token", tokenJWT);
      }
      return true;
    }
    return false;
  }

    logout(): void {
    this.loggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

    isAuthenticated(): boolean {
    // Comprueba si existe el token en el almacenamiento del navegador
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("token");
    }
    return null;
  }
}



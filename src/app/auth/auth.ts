import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Interfaz que coincide exactamente con el TokenResponse de FastAPI
interface TokenResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private platformId = inject(PLATFORM_ID);
  // URL de tu controlador de FastAPI
  private apiUrl = 'http://localhost:8000/auth/login';

  constructor(private http: HttpClient) {}

  /**
   * Realiza la petición POST enviando las credenciales en formato JSON
   * Retorna un Observable para que el componente Login pueda suscribirse
   */
  login(email: String, password: String): Observable <TokenResponse>{
    const body = { email, password };

    return this.http.post<TokenResponse>(this.apiUrl, body).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  isAuthenticated(): boolean {
    // Comprueba si existe el token en el almacenamiento del navegador
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}



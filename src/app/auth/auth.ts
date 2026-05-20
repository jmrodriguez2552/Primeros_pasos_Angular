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

  register(name:string, surname:string, email:string, password:string, rol:string = 'empleado'): Observable<any> {
    const body = {name, surname, email, password, rol};
    return this.http.post('http://localhost:8000/auth/register', body);

  }

  // Descodifica el payload del JWT y extrae el campo 'rol'
  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      // Separamos las 3 partes del JWT y cogemos el payload (la del medio)
      const payloadBase64 = token.split('.')[1];
      // Descodificamos el string Base64 a JSON string
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.rol || 'empleado';
    } catch (e) {
      return '';
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}



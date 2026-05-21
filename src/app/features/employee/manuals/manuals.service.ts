import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Manual {
  id: string;
  code: string;
  title: string;
  version: string;
  department: string;
  pdf_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ManualsService {
  private apiUrl = 'http://localhost:8000/manuals';

  constructor(private http: HttpClient) {}

  getManuals(): Observable<Manual[]> {
    return this.http.get<Manual[]>(this.apiUrl);
  }

  // Descarga el binario del PDF inyectando el token gracias a tu Interceptor
  downloadPdf(url:string): Observable<Blob> {
    return this.http.get(url, {responseType: "blob"});
  }
}

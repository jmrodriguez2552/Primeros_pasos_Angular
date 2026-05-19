import { HttpInterceptorFn } from '@angular/common/http';


// Interceptar cualquier petición HTTP que salga de la app de Angular hacia el backend y adjuntar el token JWT en la cabecera.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Intentamos recuperar el token JWT guardado en el localStorage
  const token = localStorage.getItem('token');

  // 2. Si el token existe, clonamos la petición original e inyectamos la cabecera
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token // Coincide exactamente con lo que espera tu APIKeyHeader de FastAPI
      }
    });
    // Pasamos la petición clonada con el token incorporado
    return next(clonedRequest);
  }

  // 3. Si no hay token, dejamos pasar la petición limpia
  return next(req);
};

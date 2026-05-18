// Estructura de los datos del usuario
export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Simula la generación de un token JWT en el cliente (Frontend).
 * Transforma el objeto payload a una cadena codificada en Base64 de forma segura.
 */
export const generarTokenSimulado = (payload: UserPayload): string => {
  // 1. Crear un Header simulado estándar de JWT
  const header = { alg: "HS256", typ: "JWT" };
  
  // 2. Codificar Header y Payload a formato Base64 (btoa)
  // Usamos un truco de codificación limpia para evitar problemas con tildes o eñes
  const headerBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(header))));
  const payloadBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  
  // 3. Crear una firma ficticia
  const firmaFalsa = "firma_simulada_frontend_no_segura";

  // 4. Retornar las tres partes unidas por puntos como un JWT real
  return `${headerBase64}.${payloadBase64}.${firmaFalsa}`;
};

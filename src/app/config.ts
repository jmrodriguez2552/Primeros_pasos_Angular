import { Injectable, signal, computed } from '@angular/core';


export type language = 'es' | 'en' | 'fr';

@Injectable({
  providedIn: 'root',
})
export class ConfigService  {
  private defaultLanguaje = signal<language>('es');

  languaje = this.defaultLanguaje.asReadonly();

  private greetings = {
    es: "Bienvenido de nuevo Administrador",
    en: "Welcome back Admin",
    fr: "Bienvenue de nouveau Administrateur" 
  };

  greeting = computed(() => {
    return this.greetings[this.languaje()];
  });

  changeLanguaje(newLanguaje: language):void {
    this.defaultLanguaje.set(newLanguaje);
  }
}

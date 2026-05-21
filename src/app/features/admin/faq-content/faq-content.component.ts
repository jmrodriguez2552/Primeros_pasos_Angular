import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-faq-content',
  standalone:true,
  templateUrl: './faq-content.component.html',
  styleUrls: ['./faq-content.component.css']
})
export class FaqContentComponent {
    faqs = [
    { q: '¿Cómo se asegura este panel?', a: 'Utiliza guardianes de ruta nativos de Angular que comprueban la existencia de un token JWT simulado en el LocalStorage.' },
    { q: '¿Qué versiones tecnológicas usa?', a: 'Está desarrollado sobre la arquitectura moderna de Angular 21, Signals y maquetado con Tailwind CSS v4.' },
    { q: '¿Los datos de las tareas persisten?', a: 'Sí, empleamos una función effect() que sincroniza automáticamente tu listado con el almacenamiento local del navegador.' }
  ];
 
}

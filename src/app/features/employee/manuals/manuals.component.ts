import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface Manual {
  codigo: string;
  titulo: string;
  version: string;
  departamento: string;
}


@Component({
  selector: 'app-manuals',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css']
})
export class ManualsComponent {

 listManuals:Manual[] = [
    { codigo: 'MN-ING-01', titulo: 'Guía de Estilos de Código Backend (FastAPI)', version: 'v2.1', departamento: 'Sistemas' },
    { codigo: 'MN-ING-02', titulo: 'Arquitectura Frontend Avanzada (Angular Standalone)', version: 'v4.0', departamento: 'Sistemas' },
    { codigo: 'MN-SEG-09', titulo: 'Protocolos de Seguridad y Manejo Seguro de JWT', version: 'v1.0', departamento: 'Seguridad' },
    { codigo: 'MN-RRHH-03', titulo: 'Manual de Bienvenida y Onboarding de Personal', version: 'v1.3', departamento: 'Recursos Humanos' }
 ];

}

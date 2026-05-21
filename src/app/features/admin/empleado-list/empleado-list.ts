import { Component } from '@angular/core';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  rating: number; // Evaluación de desempeño del 1 al 10
}

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [], // En Angular moderno, @for y @if no necesitan importar CommonModule
  templateUrl: './empleado-list.html',
  styleUrl: './empleado-list.css',
})
export class EmpleadoList {
    employees: Employee[] = [
    { id: 1, name: 'Ana García', position: 'Desarrolladora Senior', department: 'Tecnología', rating: 8.7 },
    { id: 2, name: 'Carlos Mendoza', position: 'Diseñador UI/UX', department: 'Diseño', rating: 4.2 },
    { id: 3, name: 'Laura Torres', position: 'Project Manager', department: 'Operaciones', rating: 9.1 },
    { id: 4, name: 'Juan Peralta', position: 'Soporte Técnico', department: 'Tecnología', rating: 3.8 },
    { id: 5, name: 'Sofía Castro', position: 'Especialista SEO', department: 'Marketing', rating: 6.5 }
  ];
}

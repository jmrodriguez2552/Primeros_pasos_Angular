import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Manejo de Estado con Signals (notifica a Angular cuando cambia. Esto evita que el framework tenga que revisar toda la aplicación, mejorando drásticamente el rendimiento)
// Se complementan con computed para valores derivados, que se actualizan automáticamente SOLO cuando las señales de las que dependen cambian, evitando cálculos innecesarios y mejorando la eficiencia.
// Definición de la interfaz para las tareas
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  // 1. Señal principal que almacena el array de tareas de forma reactiva
  tasks = signal<Task[]>([
    { id: 1, title: 'Configurar entorno Angular', completed: true },
    { id: 2, title: 'Añadir diseño con Tailwind CSS v4', completed: true },
    { id: 3, title: 'Simular generación de JWT', completed: true },
    {id: 4, title: "Lista de tareas", completed:false},
  ])

  // Variable auxiliar para el input del formulario
  newTaskTitle = '';

  // 2. Señal computada para contar el número de tareas pendientes
  // Se actualiza de forma automática y óptima SOLO cuando la señal 'tareas' cambia
  taskPendingCount  = computed(() => {
    return this.tasks().filter(task => !task.completed).length;
  });

  // 3. Señal computada que evalúa el volumen de trabajo y devuelve el mensaje de alerta si hay más de 5 tareas pendientes
  alertTasksPending = computed(() => {
    const pendings = this.taskPendingCount();
  if (pendings > 5) {
    return `⚠️ ¡Atención Administrador! Tienes ${pendings} tareas pendientes!`;
  }
  return '';
  });

  // Método para agregar una nueva tarea modificando la señal
  insertTask(): void {
    if (!this.newTaskTitle.trim()) return; // Evitar agregar tareas vacías
    const newTask: Task = {
      id: Date.now(), // Generar un ID único basado en la marca de tiempo
      title: this.newTaskTitle,
      completed: false,
    };
    
    // Actualizamos la señal usando el método update()
    this.tasks.update(currentTasks => [...currentTasks, newTask]);
    this.newTaskTitle = ''; // Limpiar el input después de agregar la tarea
  }

  // Método para alternar el estado de completado de una tarea
  conmutarEstado(id: number): void {
    this.tasks.update(currentTasks => 
      currentTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  // Método para eliminar una tarea
  deleteTask(id: number): void {
    this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
  }

}

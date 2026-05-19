import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService, Task } from './task.service';

// Manejo de Estado con Signals (notifica a Angular cuando cambia. Esto evita que el framework tenga que revisar toda la aplicación, mejorando drásticamente el rendimiento)
// Se complementan con computed para valores derivados, que se actualizan automáticamente SOLO cuando las señales de las que dependen cambian, evitando cálculos innecesarios y mejorando la eficiencia.
// Definición de la interfaz para las tareas

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  // 1. Inicializamos la señal vacía, los datos vendrán de FastAPI y MongoDB
  tasks = signal<Task[]>([]);
  newTaskTitle = '';

  // 2. Señal computada para contar el número de tareas pendientes
  // Se actualiza de forma automática y óptima SOLO cuando la señal 'tareas' cambia
  taskPendingCount = computed(() => {
    return this.tasks().filter((task) => !task.completed).length;
  });

  // 3. Señal computada que evalúa el volumen de trabajo y devuelve el mensaje de alerta si hay más de 5 tareas pendientes
  alertTasksPending = computed(() => {
    const pendings = this.taskPendingCount();
    if (pendings > 5) {
      return `⚠️ ¡Atención Administrador! Tienes ${pendings} tareas pendientes!`;
    }
    return '';
  });

  // Inyectamos el servicio en el constructor
  constructor(private tasksService: TasksService) {}

  // Al cargar la pantalla, traemos las tareas reales guardadas en MongoDB
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe({
      next: (tasksFromBackend) => {
        this.tasks.set(tasksFromBackend); // Guardamos las tareas en la señal
      },
      error: (err) => console.error('Error al cargar tareas:', err),
    });
  }

  // Método para agregar una nueva tarea modificando la señal
  insertTask(): void {
    if (!this.newTaskTitle.trim()) return; // Evitar agregar tareas vacías

    this.tasksService.createTask(this.newTaskTitle).subscribe({
      next: (createdTask) => {
        this.tasks.update((currentTasks) => [...currentTasks, createdTask]);
        this.newTaskTitle = '';
      },
      error: (err) => console.error('Error al crear tarea:', err),
    });

  }

  // Método para alternar el estado de completado de una tarea
  conmutarEstado(id: string): void {
    const actuallyTask = this.tasks().find((t) => t.id === id);
    if (!actuallyTask) return;

    const newStage = !actuallyTask.completed;

    this.tasksService.updateTaskStatus(id, newStage).subscribe({
      next: (updatedTask) => {
        this.tasks.update((currentTasks) =>
          currentTasks.map((t) => (t.id === id ? updatedTask : t)),
        );
      },
      error: (err) => console.error('Error al actualizar el estado', err),
    });
  }

  // Método para eliminar la tarea de MongoDB
  deleteTask(id: string): void { 
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        // Si el backend la elimina con éxito, la quitamos de la señal
        this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
      },
      error: (err) => console.error('Error al eliminar tarea:', err)
    });
  }
}


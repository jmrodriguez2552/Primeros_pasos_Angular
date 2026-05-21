import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: string; // <-- Cambiado a string para MongoDB
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  private apiUrl = 'http://localhost:8000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(title: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { title });
  }

  updateTaskStatus(id: string, completed: boolean): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, { completed });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

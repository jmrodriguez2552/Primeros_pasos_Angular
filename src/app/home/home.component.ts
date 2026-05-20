import { Component, OnInit , signal, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../auth/auth';
import { Event, EventService } from '../services/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employeeName = '';
  employeeSurname = '';
  selectDate= signal<string>('');
  newText='';
  events = signal<Event[]>([]);



  constructor(private auth:Auth, private eventService:EventService, private router:Router) {}

  ngOnInit():void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.employeeName = payload.name || 'Empleado';
        this.employeeSurname = payload.surname || '';
      } catch (e) {
        this.employeeName = 'Empleado';
      }
    }

    this.eventService.getEvents().subscribe({
      next: (eventsFromBackend) => {
        this.events.set(eventsFromBackend);
      },
      error: (err) => console.error('Error al traer eventos de la agenda:', err)
    });
  }


  insertEvent():void {
    if(!this.selectDate || !this.newText.trim()) return;
    
    this.eventService.createEvent(this.selectDate(), this.newText).subscribe({
      next: (newEventCreated) => {
        // Actualizamos la señal con el evento real indexado por Mongo
        this.events.update(currentEvents => [...currentEvents, newEventCreated]);
        this.newText="";
      },
      error: (err) => console.error("Error al guardar el evento:", err)
    });
    
  }

  // Computed optimizado sobre la Signal
  eventFilter= computed(() => {
    const currentList = this.events();
    const dateFilter = this.selectDate();

    if (!dateFilter) return [];

    return currentList.filter(e => e.date === dateFilter);
  });

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}

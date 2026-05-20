import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';

interface Events {
  fecha: string;
  texto: string;
}


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
  selectDate= '';
  newText='';
  events:Events[]= [{
    fecha: '', texto: ''
  }];


  constructor(private auth:Auth, private router:Router) {}

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
  }

  insertEvent():void {
    if(!this.selectDate || !this.newText.trim()) return;
    this.events.push({
      fecha : this.selectDate,
      texto : this.newText
    });
    this.newText='';
  }

  get eventFilter(): Events[] {
    if (!this.selectDate) return [];
    return this.events.filter(e => e.fecha === this.selectDate);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}

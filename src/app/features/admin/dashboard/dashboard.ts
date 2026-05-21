import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth.js';
import { TaskList } from '../task-list/task-list.js';
import { EmpleadoList } from '../empleado-list/empleado-list.js';
import { Header } from '../header/header.js'; 
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EmpleadoList, Header, RouterModule, TaskList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private auth: Auth, private router: Router){}

  logout(): void {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}

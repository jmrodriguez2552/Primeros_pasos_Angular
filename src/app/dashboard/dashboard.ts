import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { TaskList } from '../task-list/task-list';
import { EmpleadoList } from '../empleado-list/empleado-list';
import { Header } from '../header/header';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskList, EmpleadoList, Header, RouterModule],
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

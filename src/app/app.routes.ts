import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth/auth-guard';
import { NewsHome } from './news-home/news-home';
import { NewsDetail } from './news-detail/news-detail';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { TaskList } from './task-list/task-list';
import { Register_employeeComponent } from './register_employee/register_employee.component';
import { HomeComponent } from './home/home.component';
import { ManualsComponent } from './manuals/manuals.component';


export const routes: Routes = [
    {path: "login", component: Login},
    // Rutas protegidas con authGuard
    {path: "dashboard", component: Dashboard, canActivate:[authGuard]},
    {path: "tasks", component: TaskList, canActivate:[authGuard]},
    {path: "news", component: NewsHome, canActivate:[authGuard]},
    {path: "news/:id", component: NewsDetail, canActivate:[authGuard]},
    {path: "help", component: FaqPageComponent, canActivate:[authGuard]},
    {path: "register_employee", component: Register_employeeComponent, canActivate:[authGuard]},
    {path: "home", component: HomeComponent, canActivate:[authGuard]},
    {path: "manuals", component:ManualsComponent, canActivate:[authGuard]},

    // Redirección por defecto si la ruta no existe
    {path: "", redirectTo:"/login", pathMatch: "full"},
    {path: "**", redirectTo:"/login"},
];

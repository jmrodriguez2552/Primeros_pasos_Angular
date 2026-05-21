import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login'; 
import { Dashboard } from './features/admin/dashboard/dashboard'; 
import { authGuard } from './core/guards/auth-guard';
import { NewsHome } from './features/admin/news-home/news-home'; 
import { NewsDetail } from './features/admin/news-detail/news-detail'; 
import { FaqPageComponent } from './features/admin/faq-page/faq-page.component'; 
import { TaskList } from './features/admin/task-list/task-list';
import { Register_employeeComponent } from './features/admin/register_employee/register_employee.component'; 
import { HomeComponent } from './features/employee/home/home.component'; 
import { ManualsComponent } from './features/employee/manuals/manuals.component';


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

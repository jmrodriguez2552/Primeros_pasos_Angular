import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth-guard';
import { NewsHome } from './news-home/news-home';
import { NewsDetail } from './news-detail/news-detail';
import { FaqPageComponent } from './faq-page/faq-page.component';

export const routes: Routes = [
    {path: "login", component: Login},
    {path: "dashboard", component: Dashboard, canActivate:[authGuard]},
    {path: "news", component: NewsHome, canActivate:[authGuard]},
    {path: "news/:id", component: NewsDetail, canActivate:[authGuard]},
    {path: "help", component: FaqPageComponent, canActivate: [authGuard]},
    {path: "", redirectTo:"/login", pathMatch: "full"},
    {path: "**", redirectTo:"/login"},
];

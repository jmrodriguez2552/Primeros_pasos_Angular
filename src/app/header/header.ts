import { Component , inject} from '@angular/core';
import { ConfigService, language } from '../config';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Inyectamos los servicios necesarios utilizando 'inject'
  configService = inject(ConfigService);
  private authService = inject(Auth);
  private router = inject(Router);

  greeting = this.configService.greeting;
  languaje = this.configService.languaje;

  selectLanguaje(newLanguaje: language): void {
    this.configService.changeLanguaje(newLanguaje);
  }

  goNews(): void {
    this.router.navigate(["/news"]);
  }

  goHelp(): void {
    this.router.navigate(["/help"]);
  }

  goDashboard():void {
    this.router.navigate(["/dashboard"]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

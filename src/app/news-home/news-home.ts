import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { NewsDetail } from '../news-detail/news-detail';


@Component({
  selector: 'app-news-home',
  imports: [Header],
  templateUrl: './news-home.html',
  styleUrl: './news-home.css',
})
export class NewsHome {
    private router = inject(Router);
    articles = [
    { id: 101, title: 'Lanzamiento de Angular v21', description: 'Descubre las nuevas características nativas del asistente del framework de Google.' },
    { id: 102, title: 'El éxito de Tailwind CSS v4', description: 'Por qué la nueva arquitectura basada en directivas CSS está cambiando el diseño web.' },
    { id: 103, title: 'La revolución de las Signals', description: 'Aprende a gestionar el estado de tu aplicación sin necesidad de observables complejos.' }
  ];

  seeDetail(id: number): void{
    this.router.navigate(["news/", id]);
  }

  goToDashboard(): void {
    this.router.navigate(["/dashboard"]);
  }
}

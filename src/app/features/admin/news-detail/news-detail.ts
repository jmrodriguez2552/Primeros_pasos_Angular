import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../header';  


@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [Header],
  templateUrl: './news-detail.html',
  styleUrl: './news-detail.css',
})
export class NewsDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Almacenamos el ID recibido en una señal
  newsId = signal<string | null>(null);

  ngOnInit(): void{
    // Capturamos el parámetro ':id' configurado en las rutas
    this.newsId.set(this.route.snapshot.paramMap.get("id"));
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }

}

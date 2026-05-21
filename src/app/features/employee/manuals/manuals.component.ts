import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManualsService, Manual } from './manuals.service';



@Component({
  selector: 'app-manuals',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css']
})
export class ManualsComponent implements OnInit{

  manualsList = signal<Manual[]>([]);

  constructor(private manualsService: ManualsService) {}

  ngOnInit(): void {
    this.manualsService.getManuals().subscribe({
      next: (data) => {
        this.manualsList.set(data);
      },
      error: (err) => console.error("Error al cargar la lista de manuales:", err)
    });
  }

  // Método seguro que descarga el PDF inyectando las cabeceras de autorización
  viewManual(pdfUrl:string):void {
    this.manualsService.downloadPdf(pdfUrl).subscribe({
      next: (blobData:Blob) => {
        const file = new Blob([blobData], {type: "application/pdf"});
        const fileUrl = URL.createObjectURL(file);
        // Abrimos el visor nativo en una pestaña limpia
        window.open(fileUrl, '_blank');
      },
      error: (err) => {
        alert("Permiso denegado")
        console.error("Error:", err)
      }
    });
  }

}

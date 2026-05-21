import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header'; 
import { FaqContentComponent } from '../faq-content/faq-content.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [Header, FaqContentComponent],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './shared/cabecalho/cabecalho';
import { BarraLateral } from './shared/barra-lateral/barra-lateral';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, BarraLateral],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

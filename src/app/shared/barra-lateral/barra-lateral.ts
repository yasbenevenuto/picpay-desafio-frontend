import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface ItemMenu {
  rota: string;
  exata: boolean;
  nome: string;
  icone: string;
}

@Component({
  selector: 'app-barra-lateral',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './barra-lateral.html',
  styleUrl: './barra-lateral.css',
})
export class BarraLateral {
  itens: ItemMenu[] = [
    {
      rota: '/',
      exata: true,
      nome: 'Início',
      icone: 'assets/icone-inicio.png',
    },
    {
      rota: '/candidatos',
      exata: false,
      nome: 'Candidatos',
      icone: 'assets/icone-candidatos.png',
    },
  ];
}

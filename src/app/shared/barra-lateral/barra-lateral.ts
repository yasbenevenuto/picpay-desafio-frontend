import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface ItemMenu {
  rota: string;
  exata: boolean;
  nome: string;
  icone: string;
  iconeBranco: string;
}

/**
 * Menu lateral. O item ativo vira um círculo preto com o ícone branco;
 * os outros aparecem como ícone preto com o nome embaixo.
 */
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
      iconeBranco: 'assets/icone-inicio-branco.png',
    },
    {
      rota: '/candidatos',
      exata: false,
      nome: 'Candidatos',
      icone: 'assets/icone-candidatos.png',
      iconeBranco: 'assets/icone-candidatos-branco.png',
    },
  ];
}

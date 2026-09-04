import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Faixa verde do topo: logo à esquerda e o usuário do RH à direita. */
@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  nomeUsuario = 'Yasmin Holando';
  cargoUsuario = 'Analista de RH';

  // Iniciais mostradas dentro do círculo branco.
  iniciais(): string {
    const partes = this.nomeUsuario.split(' ');
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }
}

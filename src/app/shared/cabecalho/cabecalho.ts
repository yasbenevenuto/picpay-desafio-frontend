import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  nomeUsuario = 'Yasmin Holando';
  cargoUsuario = 'Analista de RH';

  iniciais(): string {
    const partes = this.nomeUsuario.split(' ');
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }
}

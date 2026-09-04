import { Component, input, output } from '@angular/core';

export interface OpcaoCampo {
  valor: string;
  texto: string;
}

@Component({
  selector: 'app-campo-filtro',
  templateUrl: './campo-filtro.html',
  styleUrl: './campo-filtro.css',
})
export class CampoFiltro {

  rotulo = input.required<string>();
  valor = input('');
  opcoes = input<OpcaoCampo[]>([]);

  valorMudou = output<string>();

  aoDigitar(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    this.valorMudou.emit(campo.value);
  }

  aoSelecionar(evento: Event): void {
    const campo = evento.target as HTMLSelectElement;
    this.valorMudou.emit(campo.value);
  }
}

import { Component, input, output } from '@angular/core';

export interface OpcaoCampo {
  valor: string;
  texto: string;
}

/**
 * Um campo da barra de filtros.
 *
 * Se receber uma lista de opções, vira uma caixa de seleção.
 * Se não receber nada, vira um campo de texto comum.
 */
@Component({
  selector: 'app-campo-filtro',
  templateUrl: './campo-filtro.html',
  styleUrl: './campo-filtro.css',
})
export class CampoFiltro {
  // input() cria uma entrada do componente: o pai passa o valor pelo HTML.
  rotulo = input.required<string>();
  valor = input('');
  opcoes = input<OpcaoCampo[]>([]);

  // output() cria uma saída: o componente avisa o pai quando algo muda.
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

import { Component, signal } from '@angular/core';
import { output } from '@angular/core';
import { CampoFiltro, OpcaoCampo } from './campo-filtro/campo-filtro';
import { STATUS_DISPONIVEIS, rotuloStatus } from '../../../models/funcionario.model';

export interface FiltroCandidatos {
  nome: string;
  cargo: string;
  status: string;
}

/** Linha de filtros: Nome, Cargo, Status e o botão Filtrar. */
@Component({
  selector: 'app-filtros',
  imports: [CampoFiltro],
  templateUrl: './filtros.html',
  styleUrl: './filtros.css',
})
export class Filtros {
  filtrar = output<FiltroCandidatos>();

  nome = signal('');
  cargo = signal('');
  status = signal('');

  // A primeira opção, vazia, funciona como o texto de dica do campo.
  opcoesStatus: OpcaoCampo[] = [
    { valor: '', texto: 'Status' },
    ...STATUS_DISPONIVEIS.map((valor) => ({
      valor,
      texto: rotuloStatus(valor),
    })),
  ];

  aplicar(): void {
    this.filtrar.emit({
      nome: this.nome(),
      cargo: this.cargo(),
      status: this.status(),
    });
  }
}

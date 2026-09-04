import { Component, input, output } from '@angular/core';
import {
  STATUS_DISPONIVEIS,
  StatusFuncionario,
  rotuloStatus,
} from '../../../models/funcionario.model';

// 'TODOS' existe só na tela: é a aba que não filtra nada.
export type Aba = StatusFuncionario | 'TODOS';

/** Abas de status, com sublinhado verde na que está selecionada. */
@Component({
  selector: 'app-abas-status',
  templateUrl: './abas-status.html',
  styleUrl: './abas-status.css',
})
export class AbasStatus {
  ativa = input<Aba>('TODOS');
  mudou = output<Aba>();

  abas: Aba[] = ['TODOS', ...STATUS_DISPONIVEIS];

  rotulo(aba: Aba): string {
    return aba === 'TODOS' ? 'Todos' : rotuloStatus(aba);
  }
}

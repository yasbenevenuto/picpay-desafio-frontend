import { Component, input, output } from '@angular/core';
import {
  STATUS_DISPONIVEIS,
  StatusFuncionario,
  rotuloStatus,
} from '../../../models/funcionario.model';

export type Aba = StatusFuncionario | 'TODOS';

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

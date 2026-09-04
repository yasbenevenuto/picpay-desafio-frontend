import { Component, input, output } from '@angular/core';
import { ItemCandidato } from './item-candidato/item-candidato';
import { Funcionario } from '../../../models/funcionario.model';

/** Cabeçalho das colunas mais uma linha por candidato. */
@Component({
  selector: 'app-lista-candidatos',
  imports: [ItemCandidato],
  templateUrl: './lista-candidatos.html',
  styleUrl: './lista-candidatos.css',
})
export class ListaCandidatos {
  candidatos = input.required<Funcionario[]>();

  // Repassa para a tela o pedido de exclusão que veio de uma linha.
  excluir = output<Funcionario>();
}

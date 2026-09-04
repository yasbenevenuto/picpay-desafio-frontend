import { Component, input, output } from '@angular/core';
import { ItemCandidato } from './item-candidato/item-candidato';
import { Funcionario } from '../../../models/funcionario.model';

@Component({
  selector: 'app-lista-candidatos',
  imports: [ItemCandidato],
  templateUrl: './lista-candidatos.html',
  styleUrl: './lista-candidatos.css',
})
export class ListaCandidatos {
  candidatos = input.required<Funcionario[]>();

  excluir = output<Funcionario>();
}

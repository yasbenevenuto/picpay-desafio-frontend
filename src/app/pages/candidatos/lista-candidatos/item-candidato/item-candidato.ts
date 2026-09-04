import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Funcionario,
  classePonto,
  rotuloStatus,
} from '../../../../models/funcionario.model';

@Component({
  selector: 'app-item-candidato',
  imports: [RouterLink],
  templateUrl: './item-candidato.html',
  styleUrl: './item-candidato.css',
  host: { '(document:click)': 'fecharMenu()' },
})
export class ItemCandidato {
  candidato = input.required<Funcionario>();
  excluir = output<Funcionario>();

  protected readonly rotulo = rotuloStatus;
  protected readonly ponto = classePonto;

  menuAberto = signal(false);

  alternarMenu(evento: Event): void {
    evento.stopPropagation();
    this.menuAberto.update((aberto) => !aberto);
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
  }

  pedirExclusao(): void {
    this.fecharMenu();
    this.excluir.emit(this.candidato());
  }
}

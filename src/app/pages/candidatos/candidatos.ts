import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import {
  Funcionario,
  classeStatus,
  rotuloStatus,
} from '../../models/funcionario.model';

@Component({
  selector: 'app-candidatos',
  imports: [RouterLink],
  templateUrl: './candidatos.html',
  styleUrl: './candidatos.css',
})
export class Candidatos implements OnInit {
  private service = inject(FuncionarioService);

  protected readonly rotulo = rotuloStatus;
  protected readonly classe = classeStatus;

  candidatos = signal<Funcionario[]>([]);
  carregando = signal(true);
  erro = signal('');
  aviso = signal('');
  termo = signal('');

  listaFiltrada = computed(() => {
    const busca = this.termo().trim().toLowerCase();

    if (busca === '') {
      return this.candidatos();
    }

    return this.candidatos().filter(
      (candidato) =>
        candidato.nome.toLowerCase().includes(busca) ||
        candidato.cargo.toLowerCase().includes(busca)
    );
  });

  ngOnInit(): void {
    this.carregar();
  }

  aoDigitar(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    this.termo.set(campo.value);
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');

    this.service.listarTodos().subscribe({
      next: (lista) => {
        this.candidatos.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(
          'Nao foi possivel carregar os candidatos. Confira se o Spring Boot esta rodando em http://localhost:8080.'
        );
        this.carregando.set(false);
      },
    });
  }

  excluir(candidato: Funcionario): void {
    const confirmado = confirm(
      `Excluir ${candidato.nome} do processo? Essa acao nao tem volta.`
    );

    if (!confirmado) {
      return;
    }

    this.service.excluir(candidato.id).subscribe({
      next: () => {
        this.candidatos.update((lista) =>
          lista.filter((item) => item.id !== candidato.id)
        );
        this.aviso.set(`${candidato.nome} foi excluido.`);
      },
      error: () => {
        this.erro.set(
          `Nao foi possivel excluir ${candidato.nome}. Tente novamente.`
        );
      },
    });
  }
}

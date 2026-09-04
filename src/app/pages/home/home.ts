import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import {
  Funcionario,
  StatusFuncionario,
  classeStatus,
  rotuloStatus,
} from '../../models/funcionario.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private service = inject(FuncionarioService);

  protected readonly rotulo = rotuloStatus;
  protected readonly classe = classeStatus;

  candidatos = signal<Funcionario[]>([]);
  carregando = signal(true);
  erro = signal('');
  termo = signal('');

  total = computed(() => this.candidatos().length);
  emAnalise = computed(() => this.contar('EM_ANALISE'));
  aprovados = computed(() => this.contar('APROVADO'));
  reprovados = computed(() => this.contar('REPROVADO'));
  contratados = computed(() => this.contar('CONTRATADO'));

  resultados = computed(() => {
    const busca = this.termo().trim().toLowerCase();

    if (busca === '') {
      return [];
    }

    return this.candidatos().filter((candidato) => {
      const nome = candidato.nome.toLowerCase();
      const cargo = candidato.cargo.toLowerCase();
      const status = rotuloStatus(candidato.status).toLowerCase();

      return (
        nome.includes(busca) ||
        cargo.includes(busca) ||
        status.includes(busca)
      );
    });
  });

  ngOnInit(): void {
    this.carregar();
  }

  aoDigitar(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    this.termo.set(campo.value);
  }

  private carregar(): void {
    this.carregando.set(true);

    this.service.listarTodos().subscribe({
      next: (lista) => {
        this.candidatos.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(
          'Nao foi possivel falar com a API. Confira se o Spring Boot esta rodando em http://localhost:8080.'
        );
        this.carregando.set(false);
      },
    });
  }

  private contar(status: StatusFuncionario): number {
    return this.candidatos().filter((c) => c.status === status).length;
  }
}

import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import {
  Funcionario,
  classePonto,
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
  protected readonly ponto = classePonto;

  candidatos = signal<Funcionario[]>([]);
  erro = signal('');
  termo = signal('');

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
        nome.includes(busca) || cargo.includes(busca) || status.includes(busca)
      );
    });
  });

  ngOnInit(): void {

    this.service.listarTodos().subscribe({
      next: (lista) => this.candidatos.set(lista),
      error: () =>
        this.erro.set(
          'Não foi possível falar com a API. Confira se o Spring Boot está rodando em http://localhost:8080.'
        ),
    });
  }

  aoDigitar(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    this.termo.set(campo.value);
  }
}

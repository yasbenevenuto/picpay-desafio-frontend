import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario.model';
import { Filtros, FiltroCandidatos } from './filtros/filtros';
import { AbasStatus, Aba } from './abas-status/abas-status';
import { ListaCandidatos } from './lista-candidatos/lista-candidatos';
import { Paginacao } from './paginacao/paginacao';

const FILTRO_VAZIO: FiltroCandidatos = { nome: '', cargo: '', status: '' };

const POR_PAGINA = 8;

@Component({
  selector: 'app-candidatos',
  imports: [RouterLink, Filtros, AbasStatus, ListaCandidatos, Paginacao],
  templateUrl: './candidatos.html',
  styleUrl: './candidatos.css',
})
export class Candidatos implements OnInit {
  private service = inject(FuncionarioService);

  candidatos = signal<Funcionario[]>([]);
  carregando = signal(true);
  erro = signal('');
  aviso = signal('');

  // Vem do botão Filtrar. Só muda quando a pessoa clica no botão.
  filtro = signal<FiltroCandidatos>(FILTRO_VAZIO);

  // Vem das abas de status.
  aba = signal<Aba>('TODOS');

  pagina = signal(1);

  listaFiltrada = computed(() => {
    const { nome, cargo, status } = this.filtro();
    const abaAtual = this.aba();

    const buscaNome = nome.trim().toLowerCase();
    const buscaCargo = cargo.trim().toLowerCase();

    return this.candidatos().filter((candidato) => {
      const passaNome =
        buscaNome === '' || candidato.nome.toLowerCase().includes(buscaNome);

      const passaCargo =
        buscaCargo === '' || candidato.cargo.toLowerCase().includes(buscaCargo);

      const passaStatus = status === '' || candidato.status === status;

      const passaAba = abaAtual === 'TODOS' || candidato.status === abaAtual;

      return passaNome && passaCargo && passaStatus && passaAba;
    });
  });

  totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.listaFiltrada().length / POR_PAGINA))
  );

  // Recorta só os candidatos da página atual.
  listaDaPagina = computed(() => {
    const inicio = (this.pagina() - 1) * POR_PAGINA;
    return this.listaFiltrada().slice(inicio, inicio + POR_PAGINA);
  });

  primeiroDaPagina = computed(() =>
    this.listaFiltrada().length === 0 ? 0 : (this.pagina() - 1) * POR_PAGINA + 1
  );

  ultimoDaPagina = computed(() =>
    Math.min(this.pagina() * POR_PAGINA, this.listaFiltrada().length)
  );

  ngOnInit(): void {
    this.carregar();
  }

  // Filtrar ou trocar de aba sempre volta para a primeira página.
  aplicarFiltro(valores: FiltroCandidatos): void {
    this.filtro.set(valores);
    this.pagina.set(1);
  }

  trocarAba(nova: Aba): void {
    this.aba.set(nova);
    this.pagina.set(1);
  }

  irParaPagina(numero: number): void {
    this.pagina.set(numero);
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');

    // GET /funcionarios
    this.service.listarTodos().subscribe({
      next: (lista) => {
        this.candidatos.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(
          'Não foi possível carregar os candidatos. Confira se o Spring Boot está rodando em http://localhost:8080.'
        );
        this.carregando.set(false);
      },
    });
  }

  excluir(candidato: Funcionario): void {
    const confirmado = confirm(
      `Excluir ${candidato.nome} do processo? Essa ação não tem volta.`
    );

    if (!confirmado) {
      return;
    }

    // DELETE /funcionarios/{id}
    this.service.excluir(candidato.id).subscribe({
      next: () => {
        this.candidatos.update((lista) =>
          lista.filter((item) => item.id !== candidato.id)
        );
        // Se a última linha da página saiu, volta uma página.
        if (this.pagina() > this.totalPaginas()) {
          this.pagina.set(this.totalPaginas());
        }

        this.aviso.set(`${candidato.nome} foi excluído.`);
      },
      error: () => {
        this.erro.set(
          `Não foi possível excluir ${candidato.nome}. Tente novamente.`
        );
      },
    });
  }
}

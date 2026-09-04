import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario.service';
import {
  Funcionario,
  FuncionarioPatch,
  STATUS_DISPONIVEIS,
  StatusFuncionario,
  classeStatus,
  rotuloStatus,
} from '../../models/funcionario.model';

@Component({
  selector: 'app-candidato-detalhe',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './candidato-detalhe.html',
  styleUrl: './candidato-detalhe.css',
})
export class CandidatoDetalhe implements OnInit {
  private service = inject(FuncionarioService);
  private rota = inject(ActivatedRoute);
  private router = inject(Router);

  protected readonly statusDisponiveis = STATUS_DISPONIVEIS;
  protected readonly rotulo = rotuloStatus;
  protected readonly classe = classeStatus;

  candidato = signal<Funcionario | null>(null);
  carregando = signal(true);
  erro = signal('');
  aviso = signal('');

  novoStatus = signal('');
  novoCargo = signal('');
  novoSalario = signal('');

  ngOnInit(): void {
    const id = Number(this.rota.snapshot.paramMap.get('id'));
    this.carregar(id);
  }

  aoMudarStatus(evento: Event): void {
    this.novoStatus.set((evento.target as HTMLSelectElement).value);
  }

  aoDigitarCargo(evento: Event): void {
    this.novoCargo.set((evento.target as HTMLInputElement).value);
  }

  aoDigitarSalario(evento: Event): void {
    this.novoSalario.set((evento.target as HTMLInputElement).value);
  }

  salvarAlteracaoParcial(): void {
    const atual = this.candidato();

    if (atual === null) {
      return;
    }

    const dados: FuncionarioPatch = {};

    if (this.novoStatus() !== '') {
      dados.status = this.novoStatus() as StatusFuncionario;
    }

    if (this.novoCargo().trim() !== '') {
      dados.cargo = this.novoCargo().trim();
    }

    if (this.novoSalario() !== '') {
      dados.salario = Number(this.novoSalario());
    }

    if (Object.keys(dados).length === 0) {
      this.erro.set('Escolha ao menos um campo para atualizar.');
      return;
    }

    this.erro.set('');

    this.service.atualizarParcialmente(atual.id, dados).subscribe({
      next: (atualizado) => {
        this.candidato.set(atualizado);
        this.limparCamposParciais();
        this.aviso.set('Dados atualizados.');
      },
      error: () => {
        this.erro.set('Nao foi possivel atualizar. Tente novamente.');
      },
    });
  }

  excluir(): void {
    const atual = this.candidato();

    if (atual === null) {
      return;
    }

    const confirmado = confirm(
      `Excluir ${atual.nome} do processo? Essa acao nao tem volta.`
    );

    if (!confirmado) {
      return;
    }

    this.service.excluir(atual.id).subscribe({
      next: () => this.router.navigate(['/candidatos']),
      error: () => this.erro.set('Nao foi possivel excluir o candidato.'),
    });
  }

  private carregar(id: number): void {
    this.carregando.set(true);

    this.service.buscarPorId(id).subscribe({
      next: (encontrado) => {
        this.candidato.set(encontrado);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(
          'Candidato nao encontrado. Ele pode ter sido excluido, ou a API pode estar parada.'
        );
        this.carregando.set(false);
      },
    });
  }

  private limparCamposParciais(): void {
    this.novoStatus.set('');
    this.novoCargo.set('');
    this.novoSalario.set('');
  }
}

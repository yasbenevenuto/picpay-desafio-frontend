import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FuncionarioService } from '../../services/funcionario.service';
import {
  FuncionarioRequest,
  STATUS_DISPONIVEIS,
  StatusFuncionario,
  rotuloStatus,
} from '../../models/funcionario.model';

@Component({
  selector: 'app-candidato-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './candidato-form.html',
  styleUrl: './candidato-form.css',
})
export class CandidatoForm implements OnInit {
  private service = inject(FuncionarioService);
  private rota = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected readonly statusDisponiveis = STATUS_DISPONIVEIS;
  protected readonly rotulo = rotuloStatus;

  id = signal<number | null>(null);
  carregando = signal(false);
  salvando = signal(false);
  erro = signal('');

  formulario = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],
    cargo: ['', Validators.required],
    departamento: [''],
    salario: [null as number | null],
    cidade: [''],
    status: ['EM_ANALISE' as StatusFuncionario],
  });

  ngOnInit(): void {
    const parametro = this.rota.snapshot.paramMap.get('id');

    if (parametro !== null) {
      this.id.set(Number(parametro));
      this.carregarCandidato(Number(parametro));
    }
  }

  editando(): boolean {
    return this.id() !== null;
  }

  invalido(nomeDoCampo: string): boolean {
    const campo = this.formulario.get(nomeDoCampo);
    return campo !== null && campo.invalid && campo.touched;
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.erro.set('Preencha os campos obrigatórios antes de salvar.');
      return;
    }

    this.salvando.set(true);
    this.erro.set('');

    const dados = this.montarRequest();
    const idAtual = this.id();

    if (idAtual === null) {

      this.service.criar(dados).subscribe({
        next: (criado) => this.router.navigate(['/candidatos', criado.id]),
        error: (falha) => this.tratarErro(falha),
      });
    } else {

      this.service.atualizar(idAtual, dados).subscribe({
        next: () => this.router.navigate(['/candidatos', idAtual]),
        error: (falha) => this.tratarErro(falha),
      });
    }
  }

  private carregarCandidato(id: number): void {
    this.carregando.set(true);

    this.service.buscarPorId(id).subscribe({
      next: (candidato) => {
        this.formulario.patchValue({
          nome: candidato.nome,
          email: candidato.email,
          telefone: candidato.telefone ?? '',
          cargo: candidato.cargo,
          departamento: candidato.departamento ?? '',
          salario: candidato.salario,
          cidade: candidato.cidade ?? '',
          status: candidato.status ?? 'EM_ANALISE',
        });
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Candidato não encontrado.');
        this.carregando.set(false);
      },
    });
  }

  private montarRequest(): FuncionarioRequest {
    const valores = this.formulario.getRawValue();

    return {
      nome: (valores.nome ?? '').trim(),
      email: (valores.email ?? '').trim(),
      telefone: this.textoOuNulo(valores.telefone),
      cargo: (valores.cargo ?? '').trim(),
      departamento: this.textoOuNulo(valores.departamento),
      salario: this.numeroOuNulo(valores.salario),
      cidade: this.textoOuNulo(valores.cidade),
      status: valores.status ?? null,
    };
  }

  private textoOuNulo(valor: string | null | undefined): string | null {
    const texto = (valor ?? '').trim();
    return texto === '' ? null : texto;
  }

  private numeroOuNulo(valor: number | string | null | undefined): number | null {
    if (valor === null || valor === undefined || valor === '') {
      return null;
    }
    return Number(valor);
  }

  private tratarErro(falha: HttpErrorResponse): void {
    this.salvando.set(false);

    if (falha.status === 400 && falha.error) {

      const mensagens = Object.values(falha.error).join(' ');
      this.erro.set(mensagens || 'Confira os dados enviados.');
      return;
    }

    this.erro.set(
      'Não foi possível salvar. Confira se o Spring Boot está rodando em http://localhost:8080.'
    );
  }
}

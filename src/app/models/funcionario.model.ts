// Espelha o enum StatusFuncionario do backend.
export type StatusFuncionario =
  | 'EM_ANALISE'
  | 'APROVADO'
  | 'REPROVADO'
  | 'CONTRATADO';

export const STATUS_DISPONIVEIS: StatusFuncionario[] = [
  'EM_ANALISE',
  'APROVADO',
  'REPROVADO',
  'CONTRATADO',
];

// Como o backend devolve (classe Funcionario).
export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  cargo: string;
  departamento: string | null;
  salario: number | null;
  cidade: string | null;
  status: StatusFuncionario | null;
}

// Corpo do POST e do PUT (FuncionarioRequestDTO). Não tem id: o backend gera.
export interface FuncionarioRequest {
  nome: string;
  email: string;
  telefone: string | null;
  cargo: string;
  departamento: string | null;
  salario: number | null;
  cidade: string | null;
  status: StatusFuncionario | null;
}

// Corpo do PATCH (FuncionarioPatchDTO). Todos os campos são opcionais.
export interface FuncionarioPatch {
  nome?: string;
  email?: string;
  telefone?: string;
  cargo?: string;
  departamento?: string;
  salario?: number;
  cidade?: string;
  status?: StatusFuncionario;
}

// Texto que aparece na tela para cada status.
export function rotuloStatus(status: StatusFuncionario | null): string {
  switch (status) {
    case 'EM_ANALISE':
      return 'Em análise';
    case 'APROVADO':
      return 'Aprovado';
    case 'REPROVADO':
      return 'Reprovado';
    case 'CONTRATADO':
      return 'Contratado';
    default:
      return 'Sem status';
  }
}

// Apelido curto do status, usado para montar as classes de cor no CSS.
export function codigoStatus(status: StatusFuncionario | null): string {
  switch (status) {
    case 'EM_ANALISE':
      return 'analise';
    case 'APROVADO':
      return 'aprovado';
    case 'REPROVADO':
      return 'reprovado';
    case 'CONTRATADO':
      return 'contratado';
    default:
      return 'neutro';
  }
}

// Etiqueta colorida (usada na Início e nos detalhes).
export function classeStatus(status: StatusFuncionario | null): string {
  return 'etiqueta etiqueta-' + codigoStatus(status);
}

// Bolinha colorida + texto (usada na tabela de candidatos).
export function classePonto(status: StatusFuncionario | null): string {
  return 'status status-' + codigoStatus(status);
}

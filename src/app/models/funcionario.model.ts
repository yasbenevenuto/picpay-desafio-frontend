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

export function classeStatus(status: StatusFuncionario | null): string {
  return 'etiqueta etiqueta-' + codigoStatus(status);
}

export function classePonto(status: StatusFuncionario | null): string {
  return 'status status-' + codigoStatus(status);
}

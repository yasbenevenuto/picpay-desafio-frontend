import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Funcionario,
  FuncionarioRequest,
  FuncionarioPatch,
} from '../models/funcionario.model';


const API_URL = 'http://localhost:8080/funcionarios';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private http = inject(HttpClient);

  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(API_URL);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${API_URL}/${id}`);
  }

  criar(funcionario: FuncionarioRequest): Observable<Funcionario> {
    return this.http.post<Funcionario>(API_URL, funcionario);
  }

  atualizar(id: number, funcionario: FuncionarioRequest): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${API_URL}/${id}`, funcionario);
  }

  atualizarParcialmente(id: number, dados: FuncionarioPatch): Observable<Funcionario> {
    return this.http.patch<Funcionario>(`${API_URL}/${id}`, dados);
  }
  
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}

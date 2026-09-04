import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Funcionario,
  FuncionarioRequest,
  FuncionarioPatch,
} from '../models/funcionario.model';

// Endereço base da API Spring Boot.
// O backend sobe em http://localhost:8080 (application.properties: server.port=8080).
// Se um dia a API for publicada com certificado, basta trocar esta linha.
const API_URL = 'http://localhost:8080/funcionarios';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private http = inject(HttpClient);

  // GET /funcionarios
  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(API_URL);
  }

  // GET /funcionarios/{id}
  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${API_URL}/${id}`);
  }

  // POST /funcionarios
  criar(funcionario: FuncionarioRequest): Observable<Funcionario> {
    return this.http.post<Funcionario>(API_URL, funcionario);
  }

  // PUT /funcionarios/{id} — substitui todos os campos
  atualizar(id: number, funcionario: FuncionarioRequest): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${API_URL}/${id}`, funcionario);
  }

  // PATCH /funcionarios/{id} — altera só os campos enviados
  atualizarParcialmente(id: number, dados: FuncionarioPatch): Observable<Funcionario> {
    return this.http.patch<Funcionario>(`${API_URL}/${id}`, dados);
  }

  // DELETE /funcionarios/{id} — responde 204, sem corpo
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}

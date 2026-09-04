import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.html',
  styleUrl: './paginacao.css',
})
export class Paginacao {
  pagina = input.required<number>();
  totalPaginas = input.required<number>();
  totalItens = input.required<number>();
  primeiro = input.required<number>();
  ultimo = input.required<number>();

  mudou = output<number>();

  numeros = computed(() => {
    const lista: number[] = [];
    for (let i = 1; i <= this.totalPaginas(); i++) {
      lista.push(i);
    }
    return lista;
  });

  anterior(): void {
    if (this.pagina() > 1) {
      this.mudou.emit(this.pagina() - 1);
    }
  }

  proxima(): void {
    if (this.pagina() < this.totalPaginas()) {
      this.mudou.emit(this.pagina() + 1);
    }
  }
}

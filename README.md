# PicPay Recrutamento — Front-end

Interface web do sistema interno de contratação de funcionários do PicPay.
Consome a API REST em Spring Boot e permite ao setor de RH cadastrar,
acompanhar, filtrar e atualizar candidatos sem precisar de Postman.

Atividade avaliativa de Spring Boot — Desenvolvimento de Sistemas, 2º ano.

**Integrantes:** Yasmin Benevenuto Holando e Matheus Lima Botana Gama

A API que este projeto consome está em
[picpay-desafio-backend](https://github.com/yasbenevenuto/picpay-desafio-backend).

---

## Tecnologias

- Angular 22 (standalone, sem NgModule)
- TypeScript
- CSS próprio, sem framework de componentes
- Fonte Inter

## Como rodar

O backend precisa estar no ar primeiro, em `http://localhost:8080`.

```bash
npm install
npm start
```

A aplicação abre em `http://localhost:4200`.

O endereço da API fica em uma constante única, no topo de
`src/app/services/funcionario.service.ts`.

## Telas

| Tela | Rota | Métodos HTTP |
|---|---|---|
| Início | `/` | GET |
| Candidatos | `/candidatos` | GET, DELETE |
| Novo candidato | `/candidatos/novo` | POST |
| Detalhes | `/candidatos/:id` | GET por ID, PATCH, DELETE |
| Editar | `/candidatos/:id/editar` | GET por ID, PUT |

**Início** traz uma busca por nome, cargo ou status.

**Candidatos** tem os filtros de nome, cargo e status, abas por etapa do
processo, listagem paginada de 8 em 8 e um menu de ações em cada linha.

**Detalhes** mostra os dados completos e traz o painel de atualização rápida,
que envia apenas os campos preenchidos.

## Onde cada método HTTP acontece

Todas as chamadas passam por `FuncionarioService`, um método por verbo.

| Método | O que dispara |
|---|---|
| GET lista | `ngOnInit` das telas Início e Candidatos, sem botão |
| GET por ID | Clicar no nome do candidato na lista |
| POST | Novo candidato, botão Salvar candidato |
| PUT | Ações → Editar, botão Salvar candidato |
| PATCH | Detalhes → Atualização rápida, botão Salvar alteração |
| DELETE | Ações → Excluir, ou o botão Excluir na tela do candidato |

O botão Salvar candidato é o mesmo para POST e PUT. Quem decide é a rota:
sem `id` na URL, é cadastro; com `id`, é edição.

Filtros, abas e paginação não chamam a API. Eles operam sobre a lista que já
veio no `GET /funcionarios`, usando `filter` e `slice`.

## Estrutura

```
src/app/
├── models/
│   └── funcionario.model.ts      tipos que espelham o backend
├── services/
│   └── funcionario.service.ts    os seis métodos HTTP
├── shared/
│   ├── cabecalho/                faixa verde do topo
│   └── barra-lateral/            menu de navegação
├── pages/
│   ├── home/
│   ├── candidatos/
│   │   ├── filtros/
│   │   │   └── campo-filtro/     um campo, vira input ou select
│   │   ├── abas-status/
│   │   ├── lista-candidatos/
│   │   │   └── item-candidato/   uma linha, com o menu Ações
│   │   └── paginacao/
│   ├── candidato-form/           cadastro e edição
│   └── candidato-detalhe/
├── app.routes.ts
└── app.config.ts                 HttpClient, Router e locale pt-BR
```

Os componentes se comunicam por `input()` e `output()`. Um `campo-filtro`
avisa o `filtros` quando o texto muda, o `filtros` avisa a tela quando o
botão Filtrar é clicado, e o `item-candidato` avisa a lista quando o usuário
pede uma exclusão. Nenhum componente filho conhece o `HttpClient`.

## PUT e PATCH

**PUT** substitui o candidato inteiro. Por isso a tela de edição faz um
`GET /funcionarios/{id}` antes de liberar o formulário: os campos precisam
chegar preenchidos, senão salvar apagaria o que não foi digitado.

**PATCH** envia apenas o que foi preenchido. Mudar somente o status resulta
em um corpo de uma chave, e o backend preserva o restante.

## Estado sem Zone.js

O projeto roda sem `zone.js`. Atribuir valor direto a um campo da classe não
redesenha a tela, então todo o estado dos componentes usa `signal()` e é lido
com parênteses no template (`candidatos()`).

Listas derivadas, como a filtrada e a da página atual, usam `computed()` e se
recalculam sozinhas quando qualquer signal do qual dependem muda.

## Assets

Os ícones e o logo ficam em `public/assets/`. Só o que está em `public` entra
no build.

O menu lateral usa um único arquivo por ícone, sempre em preto. Quando o item
está ativo, o CSS aplica `filter: invert(1)` para deixá-lo branco sobre o
círculo preto — assim a cor do ícone e o fundo do círculo nunca ficam
dessincronizados.

# PicPay Recrutamento — Front-end

Interface web do sistema interno de contratação de funcionários do PicPay.
Consome a API REST em Spring Boot do repositório `picpay-desafio-backend`.

- **Framework:** Angular 22 (standalone, zoneless)
- **Estilização:** Bootstrap 5 + CSS próprio com a identidade visual do PicPay
- **Comunicação:** `HttpClient` sobre HTTP

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

A busca e os indicadores (total, em análise, aprovados, reprovados,
contratados) são calculados no Angular a partir do `GET /funcionarios`, porque
a API não expõe endpoint próprio para eles.

## Organização

```
src/app/
├── models/funcionario.model.ts      Tipos que espelham o backend
├── services/funcionario.service.ts  Os cinco métodos HTTP, um por bloco
├── pages/
│   ├── home/                        Busca e indicadores
│   ├── candidatos/                  Listagem, busca e exclusão
│   ├── candidato-form/              Cadastro (POST) e edição (PUT)
│   └── candidato-detalhe/           Dados, atualização parcial (PATCH), exclusão
├── app.routes.ts                    Rotas
└── app.config.ts                    HttpClient, Router e locale pt-BR
```

## PUT e PATCH

**PUT** substitui todos os campos do candidato de uma vez. Por isso a tela de
edição carrega os valores atuais antes de deixar salvar.

**PATCH** altera apenas os campos enviados. O painel "Atualização rápida" na
tela de detalhes monta o corpo só com o que foi preenchido.

## Estado sem Zone.js

O projeto roda sem `zone.js`. Atribuir valor direto a um campo da classe não
redesenha a tela, então todo o estado dos componentes usa `signal()` e é lido
com parênteses no template (`candidatos()`).

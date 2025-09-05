# E-commerce API

API REST para e-commerce construída com Node.js, Express 5 e TypeScript, utilizando Firebase (Auth, Firestore e Storage) como backend de autenticação, banco de dados e arquivos.

## Visão Geral
- Autenticação via Firebase (login por e-mail/senha e usuário anônimo)
- CRUD de Usuários, Empresas, Categorias, Produtos e Formas de Pagamento
- Pedidos com cálculo de subtotal/total e mudança de status
- Upload de imagem de produto (Base64) para Firebase Storage
- Validação de payload com Celebrate/Joi e tratamento centralizado de erros

## Requisitos
- Node.js 20
- Projeto Firebase configurado com:
  - Firebase Authentication habilitado
  - Firestore habilitado (modo de segurança conforme necessidade)
  - Firebase Storage habilitado e bucket configurado
  - Chave de API Web (para SDK client) e credenciais de serviço (para Admin SDK)

## Stack e Estrutura
- Runtime: `express@5` + `typescript`
- Auth: `firebase-admin/auth` e `firebase/auth`
- DB: `firebase-admin/firestore`
- Storage: `firebase-admin/storage`
- Validação: `celebrate`/`Joi`

Estrutura principal:
- `src/routes/*`: definição das rotas HTTP
- `src/controllers/*`: orquestra requisição/resposta
- `src/services/*`: regras de negócio
- `src/repositories/*`: acesso ao Firestore
- `src/models/*`: modelos, conversores (Firestore) e schemas Joi
- `src/middlewares/*`: autenticação, erros e permissões

Arquivos de referência:
- `package.json:1` — scripts e dependências
- `src/app.ts:1` — bootstrap do servidor, middlewares e rotas
- `src/routes/index.ts:1` — montagem das rotas
- `src/services/upload-file.service.ts:1` — upload de imagens para Storage

## Configuração
1) Instale as dependências:
```
npm install
```

2) Crie um arquivo `.env` na raiz com, no mínimo:
```
API_KEY=SEU_FIREBASE_WEB_API_KEY
NODE_ENV=development
```
- `API_KEY` é usado pelo `firebase/app` (SDK client) para login, reset de senha e anônimo.

3) Configure as credenciais do Firebase Admin SDK:
- Gere uma conta de serviço no Console Firebase/Google Cloud (JSON)
- Defina a variável de ambiente apontando para o arquivo JSON:
  - macOS/Linux: `export GOOGLE_APPLICATION_CREDENTIALS="/caminho/para/arquivo.json"`
  - Windows (PowerShell): `$env:GOOGLE_APPLICATION_CREDENTIALS="C:\\caminho\\arquivo.json"`

4) (Opcional) Bucket do Storage
- O bucket está definido no código: `e-commerce-3c2be.firebasestorage.app` em `src/services/upload-file.service.ts:1`.
- Se usar outro projeto/bucket, ajuste esse valor no serviço de upload.

## Execução
Compila em watch e sobe o servidor na porta 3000:
```
npm start
```
- O script usa `tsc-watch` e executa `node --env-file=.env ./lib/app.js`.
- A API fica disponível em `http://localhost:3000`.

## Autenticação e Permissões
- Middleware de autenticação lê `Authorization: Bearer <token>` e valida via Firebase Admin.
- Rotas públicas (sem token), por padrão:
  - GET: `/companies`, `/products`, `/categories`, `/payment-methods`, `/order/:id`, `/orders?…`
  - POST: `/orders`
- Para demais rotas, obtenha um token via:
  - `POST /auth/login` (email/senha)
  - `POST /auth/signin` (anônimo)

Exemplo de header:
```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints Principais
Autenticação:
- POST `/auth/login` — body: `{ email, password }` → `{ token }`
- POST `/auth/recovery` — body: `{ email }` → 200
- POST `/auth/signin` — cria sessão anônima → `{ token }`

Usuários (`/users`):
- GET `/users` | GET `/users/:id`
- POST `/users` — `{ nome, email, password }`
- PUT `/users/:id` — `{ nome, email, password }`
- DELETE `/users/:id`

Empresas (`/companies`):
- GET `/companies` | GET `/companies/:id`
- POST `/companies` | PUT `/companies/:id`

Categorias (`/categories`):
- GET `/categories` | GET `/categories/:id`
- POST `/categories` — `{ descricao }`
- PUT `/categories/:id` — `{ descricao }`
- DELETE `/categories/:id`

Produtos (`/products`):
- GET `/products?categoriaId=...` | GET `/products/:id`
- POST `/products` — `{ nome, descricao?, preco, imagem(base64)?, categoria:{id}, ativo? }`
- PUT `/products/:id` — `{ ... }` (imagem pode ser base64 ou URL)
- DELETE `/products/:id`

Formas de Pagamento (`/payment-methods`):
- GET `/payment-methods` | GET `/payment-methods/:id`
- POST `/payment-methods` | PUT `/payment-methods/:id` | DELETE `/payment-methods/:id`

Pedidos (`/orders`):
- POST `/orders` — cria pedido
- GET `/orders?empresaId&dataInicio&dataFim&status`
- GET `/orders/:id` — detalhe
- GET `/orders/:id/itens` — itens
- POST `/orders/:id/status` — `{ status: "aprovado|entrega|concluido|cancelado" }`

## Exemplos Rápidos (curl)
Login e uso do token:
```
curl -s -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@dominio.com","password":"senha123"}'
```

Listar produtos públicos:
```
curl -s http://localhost:3000/products
```

Criar produto (requer token):
```
TOKEN="<seu_token>"
curl -s -X POST http://localhost:3000/products \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "nome":"Pizza Margherita",
    "descricao":"Clássica",
    "preco": 49.9,
    "imagem": null,
    "categoria": {"id":"<categoriaId>"},
    "ativo": true
  }'
```

Criar pedido (público):
```
curl -s -X POST http://localhost:3000/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "empresa": {"id":"<empresaId>"},
    "cliente": {"nome":"João","telefone":"11999998888"},
    "isEntrega": true,
    "endereco": {"cep":"01000-000","logradouro":"Rua A","numero":"123","bairro":"Centro","cidade":"SP","uf":"SP"},
    "cpfCnpjCupom": null,
    "formaPagamento": {"id":"<paymentId>"},
    "taxaEntrega": 5,
    "itens": [{"produto": {"id":"<produtoId>"}, "quantidade": 1, "precoUnitario": 49.9}],
    "observacao": null
  }'
```

## Tratamento de Erros
- Validações com `celebrate` retornam 400 com detalhes.
- Erros de domínio retornam status específicos (ex.: 401, 403, 404).
- Em `NODE_ENV !== production`, a stack é enviada na resposta 500 para facilitar debug.

## Dicas de Desenvolvimento
- O projeto compila para `lib` e reinicia ao salvar (`tsc-watch`).
- Tipos Express estendidos adicionam `req.user` quando autenticado.
- Ao trocar de projeto Firebase, lembre de ajustar a variável `API_KEY` e o bucket do Storage no serviço de upload.

## Licença
ISC


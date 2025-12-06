# Fincheck API

API REST para controle financeiro pessoal desenvolvida com NestJS e TypeScript.

## 📋 Sobre o Projeto

O Fincheck é uma aplicação backend robusta para gerenciamento de finanças pessoais, permitindo aos usuários controlar suas contas bancárias, categorias de transações e movimentações financeiras (receitas e despesas). A API foi construída seguindo as melhores práticas de arquitetura, segurança e organização de código.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript-first para PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Criptografia de senhas
- **[class-validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[class-transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular baseada em princípios SOLID e DDD (Domain-Driven Design):

```
src/
├── infra/              # Camada de infraestrutura
│   ├── config/         # Configurações e variáveis de ambiente
│   ├── database/       # Schemas, migrations e conexão com DB
│   └── repositories/   # Implementações de repositórios
├── modules/            # Módulos da aplicação
│   ├── auth/           # Autenticação e autorização
│   ├── bank-accounts/  # Gerenciamento de contas bancárias
│   ├── categories/     # Categorias de transações
│   ├── transactions/   # Transações financeiras
│   └── users/          # Gerenciamento de usuários
└── shared/             # Recursos compartilhados
    ├── constants/      # Constantes da aplicação
    ├── decorators/     # Decorators customizados
    ├── jwt/            # Serviços JWT
    ├── pipes/          # Pipes de validação
    └── services/       # Serviços compartilhados
```

## ✨ Funcionalidades

### Autenticação

- ✅ Registro de usuários com validação de dados
- ✅ Login com JWT (Access Token + Refresh Token)
- ✅ Refresh token via cookies HTTP-only
- ✅ Logout com invalidação de tokens
- ✅ Guards de autenticação e autorização
- ✅ Suporte a web e mobile (via ClientType)

### Contas Bancárias

- ✅ CRUD completo de contas bancárias
- ✅ Validação de propriedade de recursos
- ✅ Diferentes tipos de contas (corrente, poupança, etc.)

### Categorias

- ✅ Gerenciamento de categorias de transações
- ✅ Categorias personalizadas por usuário
- ✅ Categorização de receitas e despesas

### Transações

- ✅ Registro de receitas e despesas
- ✅ Filtros avançados (mês, ano, conta bancária, tipo)
- ✅ Validação de dados e relacionamentos
- ✅ Histórico completo de movimentações

## 🔒 Segurança

- **Autenticação JWT** com tokens de acesso e refresh
- **Cookies HTTP-only** para armazenamento seguro de tokens
- **Bcrypt** para hash de senhas
- **Guards personalizados** para proteção de rotas
- **Validação de propriedade** de recursos por usuário
- **CORS configurável** para controle de origens permitidas
- **Validação de dados** em todas as entradas

## 🛠️ Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v14 ou superior)
- npm ou yarn

### Passos

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd fincheck/api
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
# Crie um arquivo .env na raiz do projeto
DATABASE_URL=postgresql://user:password@localhost:5432/fincheck
JWT_SECRET=sua-chave-secreta
JWT_REFRESH_SECRET=sua-chave-secreta-refresh
PORT=3000
CORS_ORIGIN=http://localhost:3001
```

4. Execute as migrations

```bash
npm run db:migrate
```

5. Inicie o servidor

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev        # Inicia em modo desenvolvimento com watch
npm run start:debug      # Inicia em modo debug

# Build e Produção
npm run build            # Compila o projeto
npm run start:prod       # Inicia em modo produção

# Database
npm run db:generate      # Gera migrations a partir dos schemas
npm run db:migrate       # Executa migrations pendentes
npm run db:studio        # Abre Drizzle Studio (GUI do banco)

# Testes
npm run test             # Executa testes unitários
npm run test:watch       # Executa testes em modo watch
npm run test:cov         # Gera relatório de cobertura
npm run test:e2e         # Executa testes end-to-end

# Qualidade de Código
npm run lint             # Executa ESLint
npm run format           # Formata código com Prettier
```

## 🗃️ Banco de Dados

O projeto utiliza Drizzle ORM com PostgreSQL. As principais entidades são:

- **users** - Usuários da aplicação
- **bank_accounts** - Contas bancárias dos usuários
- **categories** - Categorias de transações
- **transactions** - Transações financeiras
- **refresh_tokens** - Tokens de refresh para autenticação

### Migrations

As migrations são gerenciadas automaticamente pelo Drizzle Kit:

```bash
# Gerar nova migration após alterar schemas
npm run db:generate

# Aplicar migrations pendentes
npm run db:migrate

# Visualizar banco de dados
npm run db:studio
```

## 📚 API Endpoints

### Autenticação

- `POST /auth/signup` - Registro de novo usuário
- `POST /auth/signin` - Login
- `POST /auth/refresh` - Renovar access token
- `POST /auth/logout` - Logout

### Contas Bancárias

- `GET /bank-accounts` - Listar contas
- `POST /bank-accounts` - Criar conta
- `PUT /bank-accounts/:id` - Atualizar conta
- `DELETE /bank-accounts/:id` - Remover conta

### Categorias

- `GET /categories` - Listar categorias
- `POST /categories` - Criar categoria
- `PUT /categories/:id` - Atualizar categoria
- `DELETE /categories/:id` - Remover categoria

### Transações

- `GET /transactions` - Listar transações (com filtros)
- `POST /transactions` - Criar transação
- `PUT /transactions/:id` - Atualizar transação
- `DELETE /transactions/:id` - Remover transação

## 🧪 Testes

O projeto está configurado com Jest para testes unitários e e2e:

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto é privado e não possui licença pública.

## 👤 Autor

Desenvolvido por [Mateus Correia Azevedo](https://github.com/mateuscorreiaazevedo)

---

**Nota:** Certifique-se de configurar corretamente as variáveis de ambiente antes de executar o projeto.

---

<p align="center">
  Powered by <a href="http://nestjs.com/" target="blank">NestJS</a>
</p>

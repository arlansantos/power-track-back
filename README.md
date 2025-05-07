# 📊 Power Track API

Power Track é uma API RESTful desenvolvida com NestJS para controle e visualização de estatísticas empresariais, incluindo funcionalidades para gerenciar contratos, clientes, funcionários, projetos e serviços, fornecendo insights valiosos para o seu negócio.

 ## 🚀 Tecnologias Utilizadas:

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Adminer](https://www.adminer.org/) (para visualização do banco)


## 🐳 Executando Power Track com Docker Compose

### ⚙️ Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

### 📦 Passos para rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/arlansantos/power-track-back.git
cd power-track-back
```

2. Crie um arquivo .env na raiz do projeto com base no arquivo .env.example

3. Suba os containers:
```bash
docker-compose up -d --build
```

4. A API estará disponível em:
  👉 http://localhost:3000

5. Você pode acessar a interface do Adminer (visualizar o banco) via:
  👉 http://localhost:8080

6. Você pode visualizar todos os endpoints disponíveis acessando a documentação gerada pelo Swagger:
   👉 http://localhost:3000/api


## 🖥️ Executando o Power Track Localmente

### ⚙️ Pré-requisitos

- Node.js (versão recomendada: 22.14.0)
- Node Package Manager (NPM)
- PostgreSQL
- Nest CLI

### 📦 Passos para rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/arlansantos/power-track-back.git
cd power-track-back
```

2. Crie um arquivo .env na raiz do projeto com base no arquivo .env.example

3. Atualize o .env com as credenciais do seu banco PostgreSQL local:

4. Instale as dependências:
```bash
npm install
```

5. Inicie o servidor:
```bash
npm run start:dev
```

6. A API estará disponível em:
  👉 http://localhost:3000

7. Você pode visualizar todos os endpoints disponíveis acessando a documentação gerada pelo Swagger:
   👉 http://localhost:3000/api

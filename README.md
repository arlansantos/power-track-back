# 📊 Power Track API

Power Track é uma API RESTful desenvolvida com NestJS para controle e visualização de estatísticas empresariais, incluindo funcionalidades para gerenciar contratos, clientes, funcionários, projetos e serviços, fornecendo insights valiosos para o seu negócio.

 ## 🚀 Tecnologias Utilizadas:

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Adminer](https://www.adminer.org/) (para visualização do banco)

## 💡 Implementação / Evidências:

### Configuração, Mapeamento e Relacionamento do Banco de Dados
Utilização do TypeORM para realizar a conexão com o banco de dados PostgreSQL de forma eficiente e escalável.

Além disso, foi implementado o mapeamento completo das entidades com base no domínio do sistema: Customer, Contract, Employee, Service e Project. Cada entidade foi anotada com decoradores do TypeORM e do Swagger, permitindo a geração automática da documentação dos modelos e a persistência correta no banco.

### Documentação da API com Swagger

Implementação da documentação da API utilizando o Swagger no NestJS. Configuração da documentação global com título, descrição, versão e autenticação via Bearer Token. Além disso, utilização de decoradores como @ApiProperty e @ApiPropertyOptional nos DTOs para descrever os campos de entrada e saída das rotas, facilitando o entendimento da API por outros desenvolvedores e stakeholders.

### Dockerização

Foi realizada a dockerização completa da aplicação utilizando Dockerfile e docker-compose. O Dockerfile define o ambiente de produção com Node.js e compila o projeto. O docker-compose.yml orquestra os serviços da aplicação (app), banco de dados PostgreSQL (db) e Adminer (adminer) para facilitar a visualização dos dados. Essa estrutura permite que a aplicação seja executada com apenas um comando, tornando o processo de deploy mais ágil e confiável.

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

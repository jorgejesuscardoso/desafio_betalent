# 📄 Teste Técnico Back-end BeTalent

Este repositório contém a solução para o teste técnico de Back-end da BeTalent.

###  Sumário

- [📄 Teste Técnico Back-end BeTalent](#-teste-técnico-back-end-betalent)
- [🗄️ Banco de dados](#-banco-de-dados)
- [🧭 Rotas do sistema](#-rotas-do-sistema)
- [🔍 Observações](#-observações)
- [📝 Critérios de avaliação](#-critérios-de-avaliação)

- [📚 Documentação Completa do Projeto](#-documentação-completa-do-projeto)
- [🚀 Tecnologias utilizadas](#-tecnologias-utilizadas)
- [📋 Estrutura do Projeto](#-estrutura-do-projeto)
- [📦 Instalação e Execução](#-instalação-e-execução)
- [📝 Uso e Exemplos](#-uso-e-exemplos)
- [📚 Documentação Adicional](#-documentação-adicional)



## ℹ️ Descrição do teste

[Sumário](#sumário) | [Documentação Completa do Projeto](#📚-documentação-completa-do-projeto)


O Teste Técnico Back-end da BeTalent consiste em estruturar uma API RESTful conectada a um banco de dados.

Trata-se de um sistema que permite cadastrar usuários externos. Ao realizarem login, estes usuários deverão poder registrar clientes, produtos e vendas.

O(a) candidato(a) deve desenvolver o projeto em um dos seguintes frameworks: `Adonis (Node.js)` ou `Laravel (PHP)`.

### 🗄️ Banco de dados

[Sumário](#sumário) | [Documentação Completa do Projeto](#📚-documentação-completa-do-projeto)

O banco de dados deve ser estruturado à escolha do(a) candidato(a), mas minimamente deve conter:

- **usuários:** email, senha;
- **clientes:** nome, cpf;
- **endereço:** todos os campos de endereço;
- **telefones:** cliente, número;
- **produtos:** dados necessários para um tipo de produto, além de preço;
- **vendas:** cliente, produto, quantidade, preço unitário, preço total, data e hora.

### 🧭 Rotas do sistema

[Sumário](#sumário) | [Documentação Completa do Projeto](#📚-documentação-completa-do-projeto)

O sistema deve contar com rotas para:

- **Cadastro de usuário do sistema (signup);**
- **Login com JWT de usuário cadastrado (login);**
- **Clientes:**
- **Listar todos os clientes cadastrados (index):**
  - Apenas dados principais devem vir aqui;
  - Ordenar pelo ID;
- **Detalhar um(a) cliente e vendas a ele(a) (show):**
  - Trazer as vendas mais recentes primeiro;
  - Possibilidade de filtrar as vendas por mês + ano;
- **Adicionar um(a) cliente (store);**
- **Editar um(a) cliente (update);**
- **Excluir um(a) cliente e vendas a ele(a) (delete);**
- **Produtos:**
- **Listar todos os produtos cadastrados (index):**
  - Apenas dados principais devem vir aqui;
  - Ordenar alfabeticamente;
- **Detalhar um produto (show);**
- **Criar um produto (store);**
- **Editar um produto (update);**
- **Exclusão lógica ("soft delete") de um produto (delete);**
- **Vendas:**
- **Registrar venda de 1 produto a 1 cliente (store).**

## 🔍 Observações

[Sumário](#sumário) | [Documentação Completa do Projeto](#📚-documentação-completa-do-projeto)

As rotas de clientes, produtos e vendas só devem poder ser acessadas por usuários logados.

**São requisitos básicos:**

- Estruturar o sistema observando o MVC (porém, sem as views);
- Usar MySQL como banco de dados;
- Respostas devem ser em JSON;
- Pode-se usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf etc.);
- Documentar as instruções necessárias em um README (requisitos, como instalar e rodar o projeto, detalhamento de rotas e outras informações que julgar relevantes).

Caso o(a) candidato(a) não consiga completar o teste até o prazo definido, deve garantir que tudo que foi construído esteja em funcionamento. Neste caso, relatar no README quais foram as dificuldades encontradas.

### 📝 Critérios de avaliação

[Sumário](#sumário) | [Documentação Completa do Projeto](#📚-documentação-completa-do-projeto)

Serão critérios para avaliação da solução fornecida:

- Lógica de programação;
- Organização do projeto;
- Legibilidade do código;
- Validação necessária dos dados;
- Forma adequada de utilização dos recursos;
- Seguimento dos padrões especificados;
- Clareza na documentação.


# 📚 Documentação Completa do Projeto

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)


A documentação completa detalha as tecnologias utilizadas, a estrutura do projeto, instruções de instalação e execução, exemplos de uso e referências adicionais.

Também contém informações sobre as rotas disponíveis, os métodos HTTP permitidos e os parâmetros necessários para cada uma delas.

## 🚀 Tecnologias utilizadas

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

- [Node.js](https://nodejs.org/en/)
  - **Descrição:**
    Node.js é um ambiente de execução JavaScript que permite executar código JavaScript no servidor. Ele é baseado no motor V8 do Google Chrome e permite a execução de código JavaScript no lado do servidor.

- [Adonis.js](https://adonisjs.com/)
  - **Descrição:** Adonis.js é um framework Node.js que permite a criação de aplicações web robustas e escaláveis. Ele é inspirado no Laravel e segue o padrão MVC.
  
- [MySQL](https://www.mysql.com/)
  - **Descrição:** MySQL é um sistema de gerenciamento de banco de dados relacional de código aberto. Ele é amplamente utilizado em aplicações web e é uma das tecnologias mais populares para armazenamento de dados.
  
- [Docker](https://www.docker.com/)
  - **Descrição:** Docker é uma plataforma de código aberto que permite a criação, execução e gerenciamento de aplicações em contêineres. Ele é amplamente utilizado para facilitar o desenvolvimento, implantação e escalabilidade de aplicações.

- [Docker Compose](https://docs.docker.com/compose/)
  - **Descrição:** Docker Compose é uma ferramenta que permite definir e executar aplicações Docker multi-contêiner em um único arquivo de configuração. Ele é amplamente utilizado para simplificar o processo de execução de aplicações em ambientes de desenvolvimento e produção.

- [JWT](https://jwt.io/)
  - **Descrição:** JWT (JSON Web Token) é um padrão aberto que define um formato compacto e autocontido para transmitir informações entre partes como um objeto JSON. Ele é amplamente utilizado para autenticação e autorização em aplicações web e APIs.
  Os tokens JWT são assinados digitalmente e podem ser verificados para garantir a integridade dos dados.
  
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
  - **Descrição:** Bcrypt é uma biblioteca de criptografia de senhas que permite armazenar senhas de forma segura em um banco de dados. Ele é amplamente utilizado para proteger as senhas dos usuários contra ataques de força bruta e outros tipos de ataques.

- [Lucid ORM](https://adonisjs.com/docs/4.1/lucid)
  - **Descrição:** Lucid ORM é um ORM (Object-Relational Mapping) que permite interagir com um banco de dados relacional usando objetos JavaScript. Ele é amplamente utilizado em aplicações Node.js para simplificar o acesso e a manipulação de dados em um banco de dados.

- [Postman](https://www.postman.com/)
  - **Descrição:** Postman é uma ferramenta de colaboração para desenvolvimento de APIs que permite criar, testar e compartilhar APIs de forma rápida e fácil. Ele é amplamente utilizado por desenvolvedores para testar e depurar APIs durante o desenvolvimento de aplicações web e móveis.

- [TypeScript](https://www.typescriptlang.org/)
  - **Descrição:** TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft que estende o JavaScript adicionando tipos estáticos opcionais. Ele é amplamente utilizado em aplicações web e móveis para melhorar a produtividade e a qualidade do código.

## 📋 Estrutura do Projeto

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

### 👀 Visão Geral

Nestas seções, são apresentadas as principais partes do projeto, incluindo a estrutura de pastas, arquivos e módulos. A estrutura do projeto é organizada de acordo com as melhores práticas de desenvolvimento de software e segue o padrão MVC (Model-View-Controller). Cada parte do projeto é responsável por uma função específica e segue um conjunto de convenções para garantir a consistência e a legibilidade do código.

### 📁 Estrutura das Pastas

A estrutura de pastas do projeto é organizada de acordo com as melhores práticas de desenvolvimento de software e segue o padrão MVC (Model-View-Controller). Cada parte do projeto é responsável por uma função específica e segue um conjunto de convenções para garantir a consistência e a legibilidade do código.

A organização do projeto pode ser visualizada na seguinte estrutura de pastas:

```bash
/betalent
├── /app
│   ├── /Controllers
│   │   ├── /Http
│   │   │   ├── AuthController.ts       # Controlador para autenticação
│   │   │   └── UserController.ts       # Controlador para gerenciamento de usuários
│   ├── /DTO
│   │   └── /Users
│   │       ├── CreateUserDTO.ts        # DTO para criação de usuários
│   │       └── ResponseUserDTO.ts      # DTOs para formato de resposta ao usuários
│   ├── /Exceptions
│   │   └── Handler.ts                  # Manipulador de exceções
│   ├── /Middleware
│   │   └── Auth.ts                     # Middleware de autenticação
│   ├── /Models
│   │   ├── Address.ts                  # Modelo para endereços
│   │   ├── Category.ts                 # Modelo para categorias
│   │   ├── Client.ts                   # Modelo para clientes
│   │   ├── Phone.ts                    # Modelo para telefones
│   │   ├── Product.ts                  # Modelo para produtos
│   │   ├── Sale.ts                     # Modelo para vendas
│   │   └── User.ts                     # Modelo para usuários
│   └── /Utils
│       ├── ImageUpload.ts              # Funções para upload e manipulação de imagens
│       ├── Regex.ts                    # Funções e expressões regulares
│       ├── JWT.ts                      # Funções para criação e verificação de tokens JWT
│       └── ReturnDefaultMsg.ts         # Mensagens padrão de retorno
├── /Commands
│   └── Index.ts                        # Comandos personalizados para o projeto
├── /Config
│   ├── app.ts                          # Configurações gerais do aplicativo
│   ├── bodyparser.ts                   # Configuração do bodyparser
│   ├── cors.ts                         # Configuração de CORS
│   ├── database.ts                     # Configuração do banco de dados
│   ├── drive.ts                        # Configuração do drive
│   └── hash.ts                         # Configuração de hashing de senhas
├── /Contracts
│   ├── drive.ts                        # Contratos de configuração do drive
│   ├── env.ts                          # Contratos de ambiente
│   ├── events.ts                       # Contratos de eventos
│   ├── hash.ts                         # Contratos de hashing
│   └── tests.ts                        # Contratos de testes
├── /database
│   ├── /factories
│   │   └── index.ts                    # Fábricas de dados para testes
│   └── /migrations
│       ├── <timestamp>_categories.ts   # Migração para a tabela de categorias
│       ├── <timestamp>_users.ts        # Migração para a tabela de usuários
│       ├── <timestamp>_clients.ts      # Migração para a tabela de clientes
│       ├── <timestamp>_products.ts     # Migração para a tabela de produtos
│       ├── <timestamp>_sales.ts        # Migração para a tabela de vendas
│       ├── <timestamp>_addresses.ts    # Migração para a tabela de endereços
│       └── <timestamp>_phones.ts       # Migração para a tabela de telefones
├── /providers
│   └── AppProvider.ts                  # Provedor de serviços da aplicação
├── /start
│   ├── kernel.ts                       # Configuração do kernel do aplicativo
│   └── routes.ts                       # Definição das rotas da aplicação
├── /test
│   ├── /functional
│   │   └── hello_world.spec.ts         # Testes funcionais
│   └── bootstrap.ts                    # Configuração de bootstrap para testes
├── /tmp
│   └── /uploads                        # Diretório temporário para uploads
├── .adonisrc.json                      # Configuração do AdonisJS
├── .editorconfig                       # Configurações do editor de código
├── .env.example                        # Exemplo de arquivo de variáveis de ambiente
├── .env.test                           # Variáveis de ambiente para testes
├── ace                                 # Ferramenta de CLI do AdonisJS
├── package-lock.json                   # Lockfile do npm
├── package.json                        # Configuração do projeto npm
├── server.ts                           # Arquivo de inicialização do servidor
├── test.ts                             # Arquivo de testes (se aplicável)
├── tsconfig.json                       # Configuração do TypeScript
├── docker-compose.yml                  # Configuração do Docker Compose (se aplicável)
└── README.md                           # Documentação do projeto

```

## 📦 Instalação e Execução

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

Instruções sobre como configurar o ambiente de desenvolvimento e realizar a instalação do projeto.

### 🏅 Requisitos

Para executar o projeto, é necessário ter as seguintes ferramentas instaladas e devidamente configuradas no seu sistema:

- [Node.js](https://nodejs.org/en/): (v18.13.0)
- [npm](https://www.npmjs.com/): (v10.2.8)
- [Docker](https://www.docker.com/): (v25.0.2)
- [GIT](https://git-scm.com/): (v2.39.2)

Certifique-se de que todas as ferramentas estão instaladas corretamente antes de prosseguir com a instalação do projeto.

#### 📦 Instalação

Para instalar o projeto, siga as instruções abaixo:

1. Clone o repositório do projeto:

```bash
git clone
```
2. Rode o banco de dados em um container Docker:  
```bash
  docker-compose up -d
``` 
3. Entre na pasta do projeto e instale as dependências:
```bash
  cd betalent
  npm install
```
4. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

    > OBS: O arquivo `.env.example` contém um exemplo de configuração das variáveis de ambiente. Substitua os valores das variáveis pelas suas configurações e renomeie o arquivo para `.env`.


```bash
  PORT=<suaPorta> # Porta do servidor tem que ser diferente da porta do banco de dados e ser numérica
  HOST=<seuHost>
  NODE_ENV=development
  APP_KEY=<suaChave> # Chave de aplicativo gerada pelo comando node ace generate:key
  DRIVE_DISK=local
  SECRET=<suaChave> # Chave secreta para geração de tokens JWT
  EXPIRES_IN=<tempo> # Tempo de expiração dos tokens JWT (ex: 1h, 1d, 1w, 1m, 1y)
  HASH_DRIVER=<seuDriver> # Driver de hashing de senhas (bcrypt, argon)
  SALT_ROUNDS=<número> # Número de rounds para hashing de senhas (ex: 10)
  DB_CONNECTION=mysql
  MYSQL_HOST=localhost
  MYSQL_PORT=<suaPorta> # Porta do banco de dados
  MYSQL_DATABASE=<seuBanco> # Nome do banco de dados
  MYSQL_PASSWORD=<suaSenha> # Senha do banco de dados
```
5. Execute as migrações do banco de dados:
```bash
node ace migration:run
```
6. Inicie o servidor:
```bash
node server.ts
```
7. O servidor estará disponível em `http://localhost:<PORT>`, onde `<PORT>` é a porta configurada no arquivo `.env`.

8. Para acessar o banco de dados, utilize um cliente MySQL (ex: MySQL Workbench, DBeaver) e conecte-se ao banco de dados com as credenciais configuradas no arquivo `.env`. Também é possível acessar o banco de dados a partir de um terminal usando o comando `docker exec -it <seu_container> mysql -u <seu_mysql_user> -p`.

Caso deseje criar dados iniciais para testes

1. Execute o comando `node ace make:seeder` para criar um seeder.
2. Navegue até o arquivo criado em `database/seeders` e adicione os dados iniciais.
3. Para executar o seeder, utilize o comando `node ace db:seed`.

Todos os dados iniciais contido nos seeders serão inseridos no banco de dados.

Outros comandos disponíveis podem ser visualizados com o comando `node ace`.

## 📝 Uso e Exemplos

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

Exemplos de uso e instruções sobre como interagir com a API ou outras partes do projeto.

## 📚 Documentação Adicional

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

Links e referências para documentação adicional e recursos úteis

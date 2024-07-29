# 📄 Teste Técnico Back-end BeTalent

Este repositório contém a solução para o teste técnico de Back-end da BeTalent.

###  Sumário

- [📄 Teste Técnico Back-end BeTalent](#-teste-técnico-back-end-betalent)
  - [ℹ️ Descrição do teste](#ℹ️-descrição-do-teste)
  - [🗄️ Banco de dados](#-banco-de-dados)
  - [🧭 Rotas do sistema](#-rotas-do-sistema)
  - [🔍 Observações](#-observações)
  - [📝 Critérios de avaliação](#-critérios-de-avaliação)

- [📚 Documentação Completa do Projeto](#-documentação-completa-do-projeto)
  - [🚀 Tecnologias utilizadas](#-tecnologias-utilizadas)
  - [📋 Estrutura do Projeto](#-estrutura-do-projeto)
  - [📦 Instalação e Execução](#-instalação-e-execução)
  - [🌐 API e Exemplos de Uso](#-api-e-exemplos-de-uso)
    - [📚 Rotas](#-rotas)
      - [👥 Usuários](#-usuários)
      - [📝 Exemplos de requisições para cadastro de um usuário do sistema](#-exemplos-de-requisições-para-cadastro-de-um-usuário-do-sistema)
      - [📝 Exemplos de requisições para autenticação de um usuário do sistema](#-exemplos-de-requisições-para-autenticação-de-um-usuário-do-sistema)
      - [📝 Exemplos de requisições para obter os dados de um usuário do sistema](#-exemplos-de-requisições-para-obter-os-dados-de-um-usuário-do-sistema)
      - [📝 Exemplos de requisições para obter os dados de todos os usuários do sistema](#-exemplos-de-requisições-para-obter-os-dados-de-todos-os-usuários-do-sistema)
      - [📝 Exemplos de requisições para atualizar os dados de um usuário do sistema](#-exemplos-de-requisições-para-atualizar-os-dados-de-um-usuário-do-sistema)
      - [📝 Exemplos de requisições para deletar um usuário do sistema](#-exemplos-de-requisições-para-deletar-um-usuário-do-sistema)
    - [🧑‍💼 Clientes](#-clientes)
      - [📝 Exemplos de requisições para cadastro de um cliente do sistema](#-exemplos-de-requisições-para-cadastro-de-um-cliente-do-sistema)
      - [📝 Exemplos de requisições para obter os dados de um cliente do sistema](#-exemplos-de-requisições-para-obter-os-dados-de-um-cliente-do-sistema)
      - [📝 Exemplos de requisições para obter os dados de todos os clientes do sistema](#-exemplos-de-requisições-para-obter-os-dados-de-todos-os-clientes-do-sistema)
      - [📝 Exemplos de requisições para atualizar os dados de um cliente do sistema](#-exemplos-de-requisições-para-atualizar-os-dados-de-um-cliente-do-sistema)
      - [📝 Exemplos de requisições para deletar um cliente do sistema](#-exemplos-de-requisições-para-deletar-um-cliente-do-sistema)
    - [📦 Produtos](#-produtos)
      - [📝 Exemplos de requisições para cadastro de um produto do sistema](#-exemplos-de-requisições-para-cadastro-de-um-produto-do-sistema)
      - [📝 Exemplos de requisições para obter os dados de um produto do sistema](#-exemplos-de-requisições-para-obter-os-dados-de-um-produto-do-sistema)
      - [📝 Exemplos de requisições para obter os dados de todos os produtos do sistema](#-exemplos-de-requisições-para-obter-os-dados-de-todos-os-produtos-do-sistema)
      - [📝 Exemplos de requisições para atualizar os dados de um produto do sistema](#-exemplos-de-requisições-para-atualizar-os-dados-de-um-produto-do-sistema)
      - [📝 Exemplos de requisições para deletar um produto do sistema](#-exemplos-de-requisições-para-deletar-um-produto-do-sistema)
    - [📦 Vendas](#-vendas)
      - [📝 Exemplos de requisições para registrar uma venda no sistema](#-exemplos-de-requisições-para-registrar-uma-venda-no-sistema)
      
  - [📚 Links uteis e referência](#-links-uteis-e-referências)



## ℹ️ Descrição do teste

O Teste Técnico Back-end da BeTalent consiste em estruturar uma API RESTful conectada a um banco de dados.

Trata-se de um sistema que permite cadastrar usuários externos. Ao realizarem login, estes usuários deverão poder registrar clientes, produtos e vendas.

O(a) candidato(a) deve desenvolver o projeto em um dos seguintes frameworks: `Adonis (Node.js)` ou `Laravel (PHP)`.

<br>

### 🗄️ Banco de dados

O banco de dados deve ser estruturado à escolha do(a) candidato(a), mas minimamente deve conter:

  - **usuários:** email, senha;
  - **clientes:** nome, cpf;
  - **endereço:** todos os campos de endereço;
  - **telefones:** cliente, número;
  - **produtos:** dados necessários para um tipo de produto, além de preço;
  - **vendas:** cliente, produto, quantidade, preço unitário, preço total, data e hora.

<br>

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

As rotas de clientes, produtos e vendas só devem poder ser acessadas por usuários logados.

**São requisitos básicos:**

  - Estruturar o sistema observando o MVC (porém, sem as views);
  - Usar MySQL como banco de dados;
  - Respostas devem ser em JSON;
  - Pode-se usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf etc.);
  - Documentar as instruções necessárias em um README (requisitos, como instalar e rodar o projeto, detalhamento de rotas e outras informações que julgar relevantes).

Caso o(a) candidato(a) não consiga completar o teste até o prazo definido, deve garantir que tudo que foi construído esteja em funcionamento. Neste caso, relatar no README quais foram as dificuldades encontradas.

<br>

### 📝 Critérios de avaliação

Serão critérios para avaliação da solução fornecida:

  - Lógica de programação;
  - Organização do projeto;
  - Legibilidade do código;
  - Validação necessária dos dados;
  - Forma adequada de utilização dos recursos;
  - Seguimento dos padrões especificados;
  - Clareza na documentação.


# 📚 Documentação do Projeto

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

A documentação detalha as tecnologias utilizadas, a estrutura do projeto, instruções de instalação e execução, exemplos de uso e referências adicionais.

Também contém informações sobre as rotas disponíveis, os métodos HTTP permitidos e os parâmetros necessários para cada uma delas.

## 🚀 Tecnologias utilizadas


- [Node.js](https://nodejs.org/en/):  Node.js é um ambiente de execução JavaScript que permite executar código JavaScript no servidor. Ele é baseado no motor V8 do Google Chrome e permite a execução de código JavaScript no lado do servidor.

- [Adonis.js](https://adonisjs.com/): Adonis.js é um framework Node.js que permite a criação de aplicações web robustas e escaláveis. Ele é inspirado no Laravel e segue o padrão MVC.
  
- [MySQL](https://www.mysql.com/): MySQL é um sistema de gerenciamento de banco de dados relacional de código aberto. Ele é amplamente utilizado em aplicações web e é uma das tecnologias mais populares para armazenamento de dados.
  
- [Docker](https://www.docker.com/): Docker é uma plataforma de código aberto que permite a criação, execução e gerenciamento de aplicações em contêineres. Ele é amplamente utilizado para facilitar o desenvolvimento, implantação e escalabilidade de aplicações.

- [Docker Compose](https://docs.docker.com/compose/): Docker Compose é uma ferramenta que permite definir e executar aplicações Docker multi-contêiner em um único arquivo de configuração. Ele é amplamente utilizado para simplificar o processo de execução de aplicações em ambientes de desenvolvimento e produção.

- [JWT](https://jwt.io/): JWT (JSON Web Token) é um padrão aberto que define um formato compacto e autocontido para transmitir informações entre partes como um objeto JSON. Ele é amplamente utilizado para autenticação e autorização em aplicações web e APIs.
  Os tokens JWT são assinados digitalmente e podem ser verificados para garantir a integridade dos dados.
  
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Bcrypt é uma biblioteca de criptografia de senhas que permite armazenar senhas de forma segura em um banco de dados. Ele é amplamente utilizado para proteger as senhas dos usuários contra ataques de força bruta e outros tipos de ataques.

- [Lucid ORM](https://adonisjs.com/docs/4.1/lucid): Lucid ORM é um ORM (Object-Relational Mapping) que permite interagir com um banco de dados relacional usando objetos JavaScript. Ele é amplamente utilizado em aplicações Node.js para simplificar o acesso e a manipulação de dados em um banco de dados.

- [Postman](https://www.postman.com/): Postman é uma ferramenta de colaboração para desenvolvimento de APIs que permite criar, testar e compartilhar APIs de forma rápida e fácil. Ele é amplamente utilizado por desenvolvedores para testar e depurar APIs durante o desenvolvimento de aplicações web e móveis. Neste projeto, o Postman foi utilizado para testar as rotas da API e também para fazer testes de carga e desempenho com `1000` requisições em `1 minuto` em cada rota com média de `4ms` de resposta, `salvo rotas de cadastros e login que tiveram média de 53ms` de resposta.

- [TypeScript](https://www.typescriptlang.org/): TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft que estende o JavaScript adicionando tipos estáticos opcionais. Ele é amplamente utilizado em aplicações web e móveis para melhorar a produtividade e a qualidade do código.

## 📋 Estrutura do Projeto

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

### 👀 Visão Geral

Nestas seções, são apresentadas as principais partes do projeto, incluindo a estrutura de pastas, arquivos e módulos. A estrutura do projeto é organizada de acordo com o padrão MVC (Model-View-Controller). Cada parte do projeto é responsável por uma função específica e segue um conjunto de convenções para garantir a consistência e a legibilidade do código.

### 📁 Estrutura das Pastas

A estrutura do projeto visa separar as diferentes partes da aplicação em módulos distintos, facilitando a manutenção e a escalabilidade do código. Cada pasta contém arquivos relacionados a uma parte específica da aplicação, como controladores, modelos, rotas e utilitários.

A organização do projeto pode ser visualizada na seguinte estrutura de pastas:

```bash
/betalent
├── /app                                      
│   ├── /Controllers
│   │   ├── /Http
│   │   │   ├── Client.Controller.ts       # Controlador para operações relacionadas a clientes
│   │   │   ├── Login.Controller.ts        # Controlador para operações de login
│   │   │   ├── Product.Controller.ts      # Controlador para operações relacionadas a produtos
│   │   │   ├── Sale.Controller.ts         # Controlador para operações de vendas
│   │   │   └── UserController.ts          # Controlador para operações relacionadas a usuários
│   │   ├── /DTO
│   │   │  ├── ClientDTO.ts                # DTO para dados de cliente
│   │   │  ├── ProductDTO.ts               # DTO para dados de produto
│   │   │  ├── UserDTO.ts                  # DTO para dados de usuário
│   │   │  └── SaleDTO.ts                  # DTO para dados de venda
│   │   ├── /Middleware
│   │   │   ├── /client
│   │   │   │   ├── ClientValidator.middleware.ts        # Middleware para validação de dados de cliente
│   │   │   │   └── ClientUpdateValidator.middleware.ts  # Middleware para validação de atualização de cliente
│   │   │   ├── /product
│   │   │   │   ├── ProductValidator.middleware.ts       # Middleware para validação de dados de produto
│   │   │   │   └── ProductUpdateValidator.middleware.ts # Middleware para validação de atualização de produto
│   │   │   ├── /sale
│   │   │   │   └── SaleValidator.middleware.ts          # Middleware para validação de dados de venda
│   │   │   ├── /user
│   │   │   │   ├── UserValidator.middleware.ts          # Middleware para validação de dados de usuário
│   │   │   │   └── UserUpdateValidator.middleware.ts    # Middleware para validação de atualização de usuário
│   │   │   ├── Auth.middleware.ts        # Middleware para autenticação
│   │   │   └── Login.middleware.ts        # Middleware para login
│   │   ├── /Models
│   │   │   ├── Address.ts                # Modelo para dados de endereço
│   │   │   ├── Client.ts                 # Modelo para dados de cliente
│   │   │   ├── Phone.ts                  # Modelo para dados de telefone
│   │   │   ├── Product.ts                # Modelo para dados de produto
│   │   │   ├── Sale.ts                  # Modelo para dados de venda
│   │   │   └── User.ts                  # Modelo para dados de usuário
│   │   └── /Utils
│   │       ├── handleImageUpload.ts     # Utilitário para manipulação de upload de imagens
│   │       ├── defaultMsg.ts            # Utilitário para mensagens padrão
│   │       ├── JWT.ts                   # Utilitário para manipulação de JWT
│   │       ├── validator.ts             # Utilitário para validação de dados
│   │       ├── counterRequest.ts        # Utilitário para contagem de requisições
│   │       └── formatData.ts            # Utilitário para formatação de dados
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
│   ├── /migrations
│   │   ├── <timestamp>_users.ts        # Migração para a tabela de usuários
│   │   ├── <timestamp>_clients.ts      # Migração para a tabela de clientes
│   │   ├── <timestamp>_products.ts     # Migração para a tabela de produtos
│   │   ├── <timestamp>_sales.ts        # Migração para a tabela de vendas
│   │   ├── <timestamp>_addresses.ts    # Migração para a tabela de endereços
│   │   └── <timestamp>_phones.ts       # Migração para a tabela de telefones
│   └── /seeders
│       ├── 01_Client.ts                # Seeder para a tabela de clientes
│       ├── 02_User.ts                  # Seeder para a tabela de usuários
│       ├── 03_Product.ts               # Seeder para a tabela de produtos
│       ├── 04_Sale.ts                  # Seeder para a tabela de vendas
│       ├── 05_Phone.ts                 # Seeder para a tabela de telefones
│       └── 06_Address.ts               # Seeder para a tabela de endereços
├── /providers
│   └── AppProvider.ts                  # Provedor de serviços da aplicação
├── /public
│   └── /thumbs                         # Diretório de uploads de imagens
├── /start
│   ├── kernel.ts                       # Configuração do kernel do aplicativo
│   └── routes.ts                       # Definição das rotas da aplicação
├── /test
│   ├── /functional
│   │   └── hello_world.spec.ts         # Testes funcionais
│   └── bootstrap.ts                    # Configuração de bootstrap para testes
├── /tmp
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

<br>

### 👀 Requisitos para a instalação

Para executar o projeto, é necessário ter as seguintes ferramentas instaladas e devidamente configuradas no seu sistema:

- [Node.js](https://nodejs.org/en/): (v22.5.1) ou superior.
- [npm](https://www.npmjs.com/): (v10.8.2) ou superior.
- [Docker](https://www.docker.com/): (v25.0.2) ou superior.
- [GIT](https://git-scm.com/): (v2.39.2) ou superior.

As versões listadas são as utilizadas durante o desenvolvimento do projeto. Tenha certeza de que as versões instaladas em seu sistema são as mesmas ou superiores.

Certifique-se de que todas as ferramentas estão instaladas corretamente antes de prosseguir com a instalação do projeto.

<br>

#### 🏠 Instalação Local

Para instalar e rodar o projeto localmente, siga as instruções abaixo:


1. Clone o repositório do projeto e configure o docker-composer.yml:

```bash
git clone <link_do_projeto>
```

**Exemplo de configuração do Docker-Compose**

```yml
version: '3.8'        # Versão do Docker Compose

services:          # Serviços do Docker Compose 
  mysql:       # Serviço do banco de dados MySQL
    image: mysql:8.0      # Imagem do MySQL
    container_name: mysql_container   # Nome do container
    environment:    # Variáveis de ambiente
      MYSQL_ROOT_PASSWORD: seupassword   # Senha do root
      MYSQL_DATABASE: seuDataBase   # Nome do banco de dados
      MYSQL_PASSWORD: seupassword
      tz: America/Sao_Paulo  # Fuso horário, opcional
    ports:
      - "3306:3306"  # Porta do MySQL
    volumes:      # Volumes do Docker Compose para persistência de dados
      - mysql_data:/var/lib/mysql 
    networks:     # Rede do Docker Compose para comunicação entre os containers
      - betalent_network

      

  adonis:         # Serviço do AdonisJS
    container_name: adonis_container    # Nome do container
    build:      
      context: ./betalent   # Contexto do Dockerfile
      dockerfile: Dockerfile    
    working_dir: /app   # Diretório de trabalho
    volumes:    # Volumes do Docker Compose para montagem do código-fonte
      - ./betalent:/app
    command: ["npm", "run", "start"]    # Comando para iniciar o servidor
    ports:
      - "3333:3333"   # Porta do servidor
    env_file:    # Arquivo de variáveis de ambiente
      - .env
    depends_on:     # Dependências do Docker Compose para garantir a ordem de inicialização
      - mysql
    networks:   # Rede do Docker Compose para comunicação entre os containers
      - betalent_network  

volumes:
  mysql_data:

networks:
  betalent_network:
```

2. Na raiz do projeto, rode o banco de dados em um container Docker:  

```bash
  docker-compose up -d
``` 
    
<br>

  > OBS: Esse comando também irá subir o servidor num container Docker, o que fará com que não precise fazer os passos seguintes. Caso queira rodar o servidor localmente, abra o arquivo `docker-compose.yml` e comente da linha 21 até o 37. Isso impedirá que o servidor suba no container Docker.

  
<br>

3. Entre na pasta do projeto e instale as dependências:

```bash
  cd betalent
  npm install
```
4. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

<br>

  > OBS: O arquivo `.env.example` contém um exemplo de configuração das variáveis de ambiente. Substitua os valores das variáveis pelas suas configurações e renomeie o arquivo para `.env`. Todos esses valores podem ser alterados conforme a necessidade já que são apenas exemplos e são padrões criados pelo AdonisJS.


<br>

**Variáveis de Ambiente**

  | Variável        | Descrição                                    | Exemplo                   |
  |-----------------|----------------------------------------------|---------------------------|
  | `PORT`          | Porta do servidor                            | `3333`                    |
  | `HOST`          | Host do servidor                             | `localhost`               |
  | `NODE_ENV`      | Ambiente de execução                         | `development`             |
  | `APP_KEY`       | Chave de aplicativo                          | `node ace generate:key`   |
  | `DRIVE_DISK`    | Disco de armazenamento                       | `local`                   |
  | `SECRET`        | Chave secreta para JWT                       | `sua_chave_secreta`       |
  | `EXPIRES_IN`    | Tempo de expiração do token                  | `1d`                      |
  | `HASH_DRIVER`   | Driver de hashing                            | `bcrypt`                  |
  | `SALT_ROUNDS`   | Número de rounds para hashing                | `10`                      |
  | `DB_CONNECTION` | Tipo de conexão de banco de dados            | `mysql`                   |
  | `MYSQL_HOST`    | Host do banco de dados                       | `localhost`               |
  | `MYSQL_PORT`    | Porta do banco de dados                      | `3306`                    |
  | `MYSQL_DATABASE`| Nome do banco de dados                       | `meu_banco`               |
  | `MYSQL_USER`    | Usuário do banco de dados                    | `seu_user`                 |
  | `MYSQL_PASSWORD`| Senha do banco de dados                      | `senha_secreta`           |


5. Execute as migrações do banco de dados:
```bash
node ace migration:run
```
6. Inicie o servidor:
```bash
node ace serve --watch
```
7. O servidor estará disponível em `http://localhost:<PORT>`, onde `<PORT>` é a porta configurada no arquivo `.env`.

8. Para acessar o banco de dados, utilize um cliente MySQL (ex: MySQL Workbench, DBeaver) e conecte-se ao banco de dados com as credenciais configuradas no arquivo `.env`.

    Também é possível acessar o banco de dados a partir de um terminal usando o comando:

 ```bash
 docker exec -it <seu_container_db> mysql -u <seu_mysql_user> -p
 ```

<br>

 Após isso, insira a senha do banco de dados e você estará conectado ao banco de dados.

<br>

  > OBS: Enquanto você estiver digitando a senha, não aparecerá nada na tela, mas ela está sendo digitada.

<br>

 Para certificar que entrou de fato no terminal do banco de dados, utilize as seguintes queries:
 ```bash
  show databases;
  use betalent;
  show tables;
```

Se você não fez nenhuma alteração no banco de dados, o retorno deverá ser algo parecido com isso:

```bash
+------------------------+
| Tables_in_betalent     |
+------------------------+
| addresses              |
| adonis_schema          |
| adonis_schema_versions |
| categories             |
| clients                |
| phones                 |
| products               |
| sales                  |
| users                  |
+------------------------+
```
Para sair do terminal do banco de dados, utilize o comando:
```bash
exit;
```

<br>

**Dados Iniciais**

Caso deseje criar dados iniciais para testes

1. Execute o comando `node ace make:seeder` para criar um seeder.
2. Navegue até o arquivo criado em `database/seeders` e adicione os dados iniciais.

Exemplo de seeder:

```typescript
import BaseSeeder from './BaseSeeder';
import User from 'App/Models/User';

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'John Doe',
        email: 'john@mail.com',
        password: 'Abc123@',
        phone: '11 9 9999-9999',
        role: 'admin',
      },
      {
        name: 'Jane Doe',
        email: 'jane@mail.com',
        password: 'Abc123@',
        phone: '11 9 9999-9998',
        role: 'user',
      },
    ]);
  }
}
```



3. Para executar o seeder, utilize o comando `node ace db:seed`.

Todos os dados iniciais contido nos seeders serão inseridos no banco de dados.

> 👀 Alguns seeders já estão criados no projeto, como `Client.ts`, `User.ts`, `Product.ts`, `Sale.ts`, `Phone.ts` e `Address.ts`. Se desejar, pode adicionar mais seeders.

Outros comandos disponíveis podem ser visualizados com o comando `node ace`.

Caso deseje parar o container, utilize o comando:

```bash
docker-compose down
```

<br>

#### 🐳 Docker Container

Para instalar e rodar o projeto em um container Docker, siga as instruções abaixo:

1. Clone o repositório do projeto:

```bash
git clone <link_do_projeto>
```
2. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente, [veja um exemplo das variáveis de ambiente](#variáveis-de-ambiente).

<br>

  > OBS: O arquivo `.env.example` contém um exemplo de configuração das variáveis de ambiente. Substitua os valores das variáveis pelas suas configurações e renomeie o arquivo para `.env`.

<br>

3. Execulte o docker-compose para subir os containers do projeto e do banco de dados:
   
```bash
docker-compose up -d
```
 > 👀 Todas as dependências do projeto serão instaladas, todas migrações serão feitas, todos os seeders serão lançados no banco de dados e o servidor será iniciado automaticamente. O servidor estará disponível em `http://localhost:<PORT>`, onde `<PORT>` é a porta configurada no arquivo `.env`.

4. Poderá acessar o container do projeto pelo terminal com o comando:

```bash
docker exec -it <seu_container_backend> /bin/bash
```
5. Para acessar o banco de dados, utilize um cliente MySQL (ex: MySQL Workbench, DBeaver) e conecte-se ao banco de dados com as credenciais configuradas no arquivo `.env`. Também é possível acessar o banco de dados a partir de um terminal usando o comando: 

```bash
docker exec -it <seu_container_db> mysql -u <seu_mysql_user> -p
```
  >> 👀 Atenção: caso deseje criar algum seeder enquanto utiliza o projeto com docker, você terá que semear via container. Se tentar fora do container, não vai conseguir.

  Para subir seeders via container, entre no container com o comando:

```bash
docker exec -it <seu_container_backend> /bin/bash
```
  Depois semeie com o comando:

```bash
node ace db:seed
```

<br>

Caso deseje parar o container, utilize o comando:

```bash
docker-compose down
```
Para apagar, <b>permanentemente</b>, todas as imagens e volumes de todos os containeres, utilize o comando:

```bash
docker system prune -af
```

Caso não consiga acessar o container, verifique se o container está rodando com o comando:

```bash
docker ps
```

Confira se o container está rodando e se o nome do container está correto. O nome do container é o nome que você deu ao container no arquivo `docker-compose.yml`.

Você pode querer ver os logs do container, para isso, utilize o comando:

```bash
docker logs <seu_container>
```

Também pode ver os containers que pararam de rodar com o comando:

```bash
docker ps -a
```

Se o container parou de rodar, você pode reiniciá-lo com o comando:

```bash
docker start <seu_container>
```

Caso tenha problemas com o container, verifique se as portas estão corretas e se não há conflitos com outras aplicações.

Tente rodar apenas o container que está com problemas, para isso, comente os outros containers no arquivo `docker-compose.yml` e rode o comando:

```bash
docker-compose up -d
```

<br>

<br>

## 🌐 API e Exemplos de Uso

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

A API é acessada por meio de requisições HTTP e retorna respostas em formato JSON. Quase todas as rotas disponíveis são protegidas por autenticação JWT e requerem um token válido para acesso. Salvo as rotas de cadastro e login.

Os tokens JWT são gerados durante o processo de autenticação e devem ser incluídos no cabeçalho das requisições. As rotas protegidas verificam a validade do token e permitem o acesso apenas a usuários autenticados.

Os prazos de validade dos tokens JWT são configuráveis e podem ser ajustados conforme necessário. Os tokens expirados são rejeitados pelas rotas protegidas e exigem a geração de um novo token para acesso. Prazo padrão de 1 dia.

<br>

## 📚 Rotas

As rotas da API são organizadas em grupos e seguem um padrão de nomenclatura consistente. Cada grupo de rotas corresponde a uma parte específica da aplicação e contém rotas relacionadas a essa parte.

### 👥 Usuários

A rota de usuário, `/api/users`, permite criar um novo usuário no sistema, autenticar um usuário existente, obter informações sobre o usuário, atualizar os dados de usuário e deletar usuário.

<br>

### 📋 Cadastrar `METHOD:POST`:

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

  ***`URL: http://example/api/users`***

  - **email**: E-mail do usuário (string, obrigatório, único).
  - **password**: Senha do usuário (string, obrigatório). Mínimo de 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.
  - **name**: Nome do usuário (string, obrigatório).
  - **role**: Função do usuário (string, obrigatório).

<br>

**✅ Caso de sucesso:**
 
  Requisição:

   ```json
    {
      "email": "admin@adm.com",
      "password": "Admin123@",
      "name": "John Doe",
      "role": "admin"
    }
  ```
  Resposta:

  ```json  
    {
      "data": {
        "name": "John Doe",
        "email": "admin@adm.com",
        "role": "admin",
        "password": "$hashFicticio====+-hashFicticiov1nd0DA73rR@d053Lvag3mN1v3lSeisSer10E55e70h@5h3F1ct1c10",
        "created_at": "01/01/2024 20:05:23",
        "updated_at": "01/01/2024 20:05:23",
        "id": 1
      }
    }
  ```
  
  <br>
  
  **❌ Casos de erro:**
  <details> <summary>Ver Casos de Erro</summary>

  <br>
  
  - **Email já cadastrado:**

    Exemplo de entrada: `POST /api/users`
  
    Requisição:

      ```json
      {
        "email": "emailExiste@adm.com",
        "password": "Admin123@",
        "name": "John Doe",
        "role": "admin",
      }
      ```
    Resposta:

      ```json
      {
        "message": "Email already exists",
      }
      ```
  <br>
  
  - **Email com formato inválido:**

    Requisição:
    ```json
    {
      "email": "adminadm.com",  // ou "admin@adm" ou "admin" ou "admin@.com" ou "admin@adm." ou "admin@.com.",etc...
      "password": "Admin123@",
      "name": "John Doe",
      "role": "admin"
    }
    ```
    Resposta:

    ```json
    {
      "message": "Invalid email format."
    }
    ```
  <br>
  
  - **Senha com menos de 6 caracteres:**

    Requisição:

    ```json
    {
      "email": "admin@adm.com",
      "password": "Adm3@",
      "name": "John Doe",
      "role": "admin"
    }
    ```
    Resposta:

    ```json
    {
      "message": "Password deve ter no mínimo 6 caracteres."
    }
    ```
  <br>
  
  - **Senha com formato inválido:**

    Requisição:

    ```json
    {
      "email": "admin@adm.com",
      "password": "Admin", // ou "admin123@" ou "Admin123" ou "admin@123" ou "Admin@adm" ou "admin@Adm", etc...
      "name": "John Doe",
      "role": "admin",
    }

    ```
    Resposta:

    ```json
    {
      "message": "Invalid password format"
    }
    ```
<br>
  
  - **Error ao salvar no banco de dados ou do servidor:**

    Requisição:
    ```json
    {
      "email": "admin@adm.com",
      "password": "Admin123@",
      "name": "John Doe",
      "role": "admin",
    }
    ```
    Resposta:

    ```json
    {
      "message": "Internal Server Error."
    }
    ```
  </details>

<br>

### 👮 Autenticação(login) `METHOD:POST`:

<br>

  **`URL: http://example/api/login`**

  - **email**: E-mail do usuário (string, obrigatório). Formato de e-mail válido.
  - **password**: Senha do usuário (string, obrigatório). Mínimo de 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.

<br>
  
  **✅ Caso de sucesso:**
 
  Requisição:

  ```json
  {
    "email": "admin@adm.com",
    "password": "Admin123@"
  }
  ```
  Resposta:

  ```json  
  {
    "token": "eyTOKENficticioM3uam160UzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1c2hpZG9AeSS3toKeNvALL1NadAiOjE3MjE3NzE5ODcseFakeJAdiSSEcCI1nT3re554nt3n40EmesMo.qW79H2ZLCEjtJP8yYkuJPSerIoEssETokEnEfAKe"
  }
  ```
  <br>
  
  **❌ Casos de erro:**
  <details> <summary>Ver Casos de Erro</summary>

  <br>
  
  - **Email não cadastrado:**

    Exemplo de entrada: `POST /api/users`
  
    Requisição:

      ```json
      {
        "email": "emailInvalido@fail.com",
        "password": "Admin123@"
      }
      ```
    
    Resposta:

      ```json
      {
        "message": "Invalid credentials."
      }
      ```
  <br>
  
    
  - **Senha incorreta:**

    Requisição:

    ```json
    {
      "email": "admin@adm.com",
      "password": "Admin123" // Senha incorreta
    }
    ```
    Resposta:

    ```json
    {
      "message": "Invalid credentials."
    }
    ```
    </details>
  <br>

### 🗄️ Obter os dados de um usuário `METHOD:GET`:
   
   <br>

  **`BODY: { }`**

  **`URL: http://example/api/users/:id`**

  - **id**: ID do usuário (number, obrigatório). ID do usuário a ser consultado.

<br>
**✅ Caso de sucesso:**
 
  Requisição no endpoint: ***<i>htt://www.example.com/api/users/1</i>***
   
  Resposta:

  ```json  
  {
    "data":{
      "name": "John Doe",
      "email": "admin@adm.com",
      "role": "admin",
      "createdAt": "01/01/2024",
      "updatedAt": "01/01/2024"
    }
  }
  ```

  <br>
  
  **❌ Caso de erro:**

  - **Usuário não encontrado ou id inválido:**

    Exemplo de entrada: `GET /api/users/:id`
  
    Requisição: ***<i>htt://www.example.com/api/users/999</i>***
    
    Resposta:

    ```json
    {
      "error": "Not found.",
      "message": "Usuário não encontrado."
    }
    ```

  <br>

### 🗄️ Obter os dados de todos os usuários `METHOD:GET`:

  <br>

  **`BODY: { }`**

  ***`URL: http://example/api/users`***

  Nenhum parâmetro é necessário para esta rota.

<br>

**✅ Caso de sucesso:**
 
  Requisição no endpoint: **<i>htt://www.example.com/api/users</i>**
  
  
  <br>
  
  **<i>Sucesso com retorno, quando não há usuário cadastrado:</i>**  

  Resposta:

  ```json  
    {
      "data": [
        {
          "name": "John Doe",
          "email": "user1@gmail.com",
          "role": "admin",
          "createdAt": "01/01/2024",
          "updatedAt": "01/01/2024"
        },
        {
          "name": "Jane Doe",
          "email": "user2@gmail.com",
          "role": "user",
          "createdAt": "01/01/2024",
          "updatedAt": "01/01/2024"
        }
      ]
    }
  ```

  <br>
  
  **<i>Sucesso sem retorno:</i>**

  Resposta:

  ```json  
    {
      "data": []
    }
  ```

  <br>
  
  **❌ Caso de erro:**

  - **Error interno do servidor:**

    Requisição: ***<i>htt://www.example.com/api/users</i>***    

    Resposta:

    ```json
    {
      "message": "Erro interno do servidor."
    }
    ```
  <br>

### 📋 Atualizar os dados de um usuário `METHOD:PUT/PATCH`:
  
  > ***Pode-se usar o método `PUT` ou `PATCH` para atualizar os dados de um usuário. O método usado não altera o funcionamento da rota. Preferencialmente, use o método `PATCH` para atualizações parciais e o método `PUT` para atualizações completas.*** 🚀

  ***`URL: http://example/api/users/:id`***

  - **id**: ID do usuário (number, obrigatório). ID do usuário a ser atualizado.
  - **email**: E-mail do usuário (string, opcional). Formato de e-mail válido.
  - **password**: Senha do usuário (string, opcional). Mínimo de 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.
  - **name**: Nome do usuário (string, opcional).
  - **role**: Função do usuário (string, opcional).

<br>

**✅ Caso de sucesso:**
 
  Requisição `METHOD:PUT`:

  ```json
  {
    "email": "emailModificado@test.com",
    "password": "Admin123@",
    "name": "John Doe",
    "role": "admin",
    "phone": "11 1 1111-1111",
    "photo": "imagem.jpg"
  }
  ```
   
  Resposta:

  ```json  
  {
    "message": "Atualizado com sucesso.",
    "data": {
      "name": "John Doe",
      "email": "emailModificado@test.com",
      "role": "admin",
      "phone": "11 1 1111-1111",
      "photo": "imagem.jpg",
      "createdAt": "01/01/2024",
      "updatedAt": "01/01/2024",
      "id": 1
    }
  }
  ```

  Requisição `METHOD:PATCH`:

  ```json
  {
    "email": "emailModificado@test.com"
  }
  ```

  Resposta:

  ```json  
  {
    "message": "Atualizado com sucesso.",
    "data": {
      "email": "emailModificado@test.com",
      "id": 1,
      "createdAt": "01/01/2024",
      "updatedAt": "01/01/2024"
    }
  }
  ```

  <br>
  
  **❌ Casos de erro:**

  <br>
  
  **Usuário não encontrado ou id inválido:**

  Exemplo de entrada: `PUT/PATCH /api/users/:id`

  Requisição: ***<i>htt://www.example.com/api/users/999</i>***
  
  Resposta:

  ```json
    {
      "error": "Not found.",
      "message": "Usuário não encontrado."
    }
  ```
  <br>

### 🗑️ Deletar um usuário `METHOD:DELETE`:**

  ***`URL: http://example/api/users/:id`***

  - **id**: ID do usuário (number, obrigatório). ID do usuário a ser deletado.

  Nenhum parâmetro é necessário para esta rota.

  <br>

  **✅ Caso de sucesso:**
 
  Requisição no endpoint: ***<i>htt://www.example.com/api/users/1</i>***
   
  Resposta: **<i>StatusHTTP: 204 No Content</i>**

  ```json  
  {
    
  }
  ```
  <br>  

  **❌ Caso de erro:**

  <br>
  
  - **Usuário não encontrado ou id inválido:**

    Exemplo de entrada: `DELETE /api/users/:id`
  
    Requisição: ***<i>htt://www.example.com/api/users/999</i>***
    
    Resposta:

      ```json
      {
        "error": "Not found.",
        "message": "Usuário não encontrado."
      }
      ```
  <br>
  
  
  
  

  





### 🧑‍💼 Clientes

  A rota de clientes, `/api/clients`, permite criar um novo cliente no sistema, obter informações sobre o cliente, atualizar os dados do cliente e deletar cliente.

  Ao cadastrar um novo cliente, os dados do cliente são validados e armazenados no banco de dados.

  A rota de clientes é protegida por autenticação JWT e requer um token válido para acesso. Os tokens JWT são gerados durante o processo de autenticação(login) e devem ser incluídos no cabeçalho `Authorization` das requisições protegidas. Um middleware de autenticação verifica a validade do token e permite o acesso apenas a usuários devidamente autenticados.

  As rotas protegidas verificam a validade do token e permitem o acesso apenas a usuários autenticados.

  O CPF do cliente é validado utilizando uma função específica que checa a conformidade do formato e dos dígitos do CPF com as regras padrões de formatação. Essa validação assegura que o CPF siga o formato correto e que os dígitos estejam de acordo com os critérios matemáticos estabelecidos. No entanto, essa validação não inclui a verificação do CPF na Receita Federal, portanto, não garante que o CPF seja válido em termos de existência ou registro oficial.

  O telefone e o email do cliente é validado por meio de expressões regulares que verificam se o formato dos dados está de acordo com os padrões esperados. Essa validação assegura que o telefone e o email sigam os formatos corretos e que sejam válidos para uso no sistema.

  Todas as verificações de validação são feitas no middleware de validação antes de os dados serem processados e armazenados no banco de dados. Essas verificações garantem que os dados inseridos sejam válidos e estejam de acordo com os critérios estabelecidos.

  <br>
  
### 📋 Cadastrar `METHOD:POST`:

  [Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

  **`URL: http://example/api/clients`**

  **`HEADER: Authorization / Bearer <token>`**

  - **name**: Nome do cliente (string, obrigatório).
  - **email**: E-mail do cliente (string, obrigatório, único). Formato de e-mail válido.
  - **phone**: Telefone do cliente (string, obrigatório, unico). Formato de telefone brasileiro válido.
  - **cpf**: CPF do cliente (string, obrigatório, único). Formato de CPF válido.

  <br>
  
### 🗄️ Obter os dados de um cliente `METHOD:GET`:

  Ao buscar um clientes por ID, o sistema retorna os dados do cliente correspondente ao ID fornecido incluindo as vendas realizadas para esse cliente.

  É possível filtrar as vendas por data inserindo mês e ano na URL. O sistema retorna as vendas realizadas para o cliente no mês e ano especificados.
   
  **`BODY: {  }`**
  
  **`URL: http://example/api/clients/:id`** Consulta padrão. Retorna os dados do cliente correspondente ao ID fornecido incluindo todas as vendas realizadas para esse cliente.

  **`URL: http://example/api/clients/:id?month=MM&year=YYYY`** Consulta com filtro. Retorna as vendas realizadas para o cliente no mês e ano especificados.

  **`HEADER: Authorization / Bearer <token>`**

  - **id**: ID do cliente (number, obrigatório). ID do cliente a ser consultado.

  <br>
  
### 🗄️ Obter os dados de todos os clientes `METHOD:GET`:

  **`BODY: {  }`**
  
  **`URL: http://example/api/clients`**

  **`HEADER: Authorization / Bearer <token>`**

  Essa consulta não precisa de um corpo, apenas o ID do cliente a ser consultado.

  É necessário um token de autenticação no cabeçalho.

  <br>
  
### 📋 Atualizar os dados de um cliente `METHOD:PUT/PATCH`:

  > ***Pode-se usar o método `PUT` ou `PATCH` para atualizar os dados de um cliente. O método usado não altera o funcionamento da rota. Preferencialmente, use o método `PATCH` para atualizações parciais e o método `PUT` para atualizações completas.*** 🚀
  
  **`HEADER: Authorization / Bearer <token>`**

  **`URL: http://example/api/clients/:id`**

  - **id**: ID do cliente (number, obrigatório). ID do cliente a ser atualizado.
  - **name**: Nome do cliente (string, opcional).
  - **email**: E-mail do cliente (string, opcional). Formato de e-mail válido.
  - **phone**: Telefone do cliente (string, opcional). Formato de telefone brasileiro válido.
  - **cpf**: CPF do cliente (string, opcional). Formato de CPF válido.

### 🗑️ Deletar um cliente `METHOD:DELETE`:

  **`HEADER: Authorization / Bearer <token>`**

  **`URL: http://example/api/clients/:id`**

  - **id**: ID do cliente (number, obrigatório). ID do cliente a ser deletado.

  <br>
  
####  📝 Exemplos de requisições para cadastro de clientes do sistema

  <details> <summary>Ver exemplos de uso</summary>

  [Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

<br>

  - **Método:** `POST`
  - **Endpoint:** `/api/clients`
  - **Parâmetros:** `name`, `email`, `phone`, `cpf`
  - **Autenticação:** Requer autenticação

  <br>
  
  **✅ Caso de sucesso:**

  Requisição:

  ```json  
  {
    "name": "John Doe",
    "email": "john.doe@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "123.456.789-10"
  }
  ```

  Resposta:

  ```json
    {
      "message": "Criado com sucesso.",
      "data": {
        "email": "johne.silva@mail.com",
        "phone": "11 1 1111-1111",
        "cpf": "088.778.320-10",
        "name": "João Silva",
        "created_at": "2024-07-24T02:47:10.706+00:00",
        "updated_at": "2024-07-24T02:47:10.706+00:00",
        "id": 1
        }
    }
  ```

  <br>
  
  **❌ Casos de erro:**

  <details> <summary>Ver Casos de Erro</summary>

  <br>
  
  - **Sem token ou token inválido:**

    Exemplo de entrada: `POST /api/clients`
  
    Requisição:

      ```json
      {
        "name": "John Doe",
        "email": "john.doe@mail.com",
        "phone": "11 1 1111-1111",
        "cpf": "123.456.789-10"
      }
    ```

    Resposta:

      ```json
      {
        "message": "Erro interno do servidor.",
        "error": {
            "name": "JsonWebTokenError",
            "message": "jwt malformed"
        }
      }
      ```

    <br>
  
  - **Token expirado:**

    Requisição:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@mail.com",
      "phone": "11 1 1111-1111",
      "cpf": "123.456.789-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "Erro interno do servidor.",
      "error": {
          "name": "TokenExpiredError",
          "message": "jwt expired"
      }
    }
    ```

  <br>
  
  - **Algum campo obrigatório não preenchido:**

    Requisição:

    ```json
    {
      "name": "", // Campo obrigatório não preenchido
      "email": "john.doe@mail.com",
      "phone": "11 1 1111-1111",
      "cpf": "123.456.789-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "Campo obrigatório não preenchido. Verifique os campos obrigatórios."
    }
    ```

  <br>
  
  - **CPF já cadastrado:**

    Requisição:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@mail.com",
      "phone": "11 1 1111-1111",
      "cpf": "123.456.789-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "CPF já cadastrado."
    }
    ```

  <br>
  
  - **CPF com formato inválido:**

    Requisição:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@mail.com",
      "phone": "11 1 1111-1111",
      "cpf": "12.456.79-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "CPF inválido."
    }
    ```

  <br>
  
  - **Telefone com formato inválido:**

    Requisição:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@mail.com",
      "phone": "111 1 1111-1111",
      "cpf": "123.456.789-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "Telefone inválido."
    }
    ```

  <br>
  
  - **Email já cadastrado:**

    Requisição:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@mail.com",
      "phone": "11 1 1111-1111",
      "cpf": "123.456.789-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "Email já cadastrado."
    }
    ```

  <br>
  
  - **Email com formato inválido:**

    Requisição:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@mail.",
      "phone": "11 1 1111-1111",
      "cpf": "123.456.789-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "Email inválido."
    }
    ```

  <br>
  
  - **Error ao salvar no banco de dados ou do servidor:**

    Requisição:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@mail.com",
      "phone": "11 1 1111-1111",
      "cpf": "123.456.789-10"
    }
    ```

    Resposta:

    ```json
    {
      "message": "Erro interno do servidor."
    }
    ```

    </details>

  </details>

####  📝 Exemplos de requisições para obter os dados de um cliente do sistema

<details> <summary>Ver exemplos de uso</summary>

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

<br>

- **Método:** `GET`
- **Endpoint:** `/api/clients/:id`
- **Parâmetros:** `id`
- **Autenticação:** Requer autenticação

  <br>
  
**✅ Caso de sucesso:**

Requisição no endpoint: ***<i>htt://www.example.com/api/clients/1</i>***

**`HEADER: Authorization / Bearer <token>`**

**`BODY: { }`**

  <br>
  
Resposta:

```json  
{
  "message": "Sucesso.",
  "data": {
    "id": 1,
    "nome": "Joãozinho da Silva",
    "cpf": "480.189.770-38",
    "email": "john.silva@mail.com",
    "telefone": "11 9 9999-9999",
    "vendas": [
      {
        "venda_id": 2,
        "quantidade": 3,
        "valor_unitario": 150,
        "total": 450,
        "data_venda": "2020-05-24T20:42:41.000Z",
        "produto": "Product 2",
        "descricao": "Description of product 2",
        "marca": "Brand 2",
        "imagem": "product2.jpg"
      },
      {
        "venda_id": 8,
        "quantidade": 2,
        "valor_unitario": 100,
        "total": 200,
        "data_venda": "2024-07-24T20:42:41.000Z",
        "produto": "Product 5",
        "descricao": "Description of product 5",
        "marca": "Brand 5",
        "imagem": "product5.jpg"
      },
      {
        "venda_id": 3,
        "quantidade": 1,
        "valor_unitario": 50,
        "total": 50,
        "data_venda": "2024-07-24T20:42:41.000Z",
        "produto": "Product 2",
        "descricao": "Description of product 2",
        "marca": "Brand 2",
        "imagem": "product2.jpg"
      }
    ]
  }
}
```

  <br>

Requisição no endpoint: ***<i>htt://www.example.com/api/clients/1?month=05&year=2020</i>*** <i>Filtrando as vendas por mês 5 e ano 2020</i>

**`HEADER: Authorization / Bearer <token>`**

**`BODY: { }`**

```json  
{
  "message": "Sucesso.",
  "data": {
    "id": 1,
    "nome": "Joãozinho da Silva",
    "cpf": "480.189.770-38",
    "email": "john.silva@mail.com",
    "telefone": "11 9 9999-9999",
    "vendas": [
      {
        "venda_id": 2,
        "quantidade": 3,
        "valor_unitario": 150,
        "total": 450,
        "data_venda": "2020-05-24T20:42:41.000Z",
        "produto": "Product 2",
        "descricao": "Description of product 2",
        "marca": "Brand 2",
        "imagem": "product2.jpg"
      }
    ]
  }
}
```

  <br>
  
**❌ Casos de erro:**

<details> <summary>Ver Casos de Erro</summary>

  <br>
  
- **Cliente não encontrado ou id inválido:**
  
  Exemplo de entrada: `GET /api/clients/:id`

  Requisição: ***<i>htt://www.example.com/api/clients/999</i>***

  **`HEADER: Authorization / Bearer <token>`**

  **`BODY: { }`**

  <br>
  
  Resposta:

  ```json
  {
    "error": "Not found.",
    "message": "Cliente não encontrado."
  }
  ```
  <br>

- **Error interno do servidor:**
  
    Requisição: ***<i>htt://www.example.com/api/clients/1</i>***

    **`HEADER: Authorization / Bearer <token>`**

    **`BODY: { }`**

    <br>
  
    Resposta:
  
    ```json
    {
      "message": "Erro interno do servidor."
    }
    ```

  </details>
</details>

<br>

####  📝 Exemplos de requisições para obter os dados de todos os clientes do sistema

<details> <summary>Ver exemplos de uso</summary>

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

<br>

- **Método:** `GET`
- **Endpoint:** `/api/clients`
- **Parâmetros:** Nenhum
- **Autenticação:** Requer autenticação
  <br>

**✅ Caso de sucesso:**

Requisição no endpoint: **<i>htt://www.example.com/api/clients</i>**

**`HEADER: Authorization / Bearer <token>`**

**`BODY: { }`**

  <br>

**<i>Sucesso com retorno:</i>**

Resposta:
```json
    {
      "message": "Sucesso.",
      "data": [
        {
          "id": 1,
          "nome": "Joãozinho da Silva",
          "email": "john.silva@mail.com"
        },
        {
          "id": 2,
          "nome": "Mariazinha da Silva",
          "email": "mary.silva@mail.com"
        },
        {
          "id": 3,
          "nome": "Zequinha da Silva",
          "email": "zack.silva@mail.com"
        },
        {
          "id": 5,
          "nome": "Mateus da Silva",
          "email": "mat.silva@mail.com"
        }
      ]
    }
  ```
  <br>

**<i>Sucesso sem retorno, quando não há clientes cadastrado:</i>**

Resposta:

```json
    {
      "message": "Sucesso.",
      "data": []
    }
  ```

  <br>

**❌ Caso de erro:**

- **Sem token ou token inválido:**

  Exemplo de entrada: `GET /api/clients`

  Requisição:

  **`HEADER: Authorization / Bearer `**

  **`BODY: { }`**

  <br>

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor.",
    "error": {
        "name": "JsonWebTokenError",
        "message": "jwt malformed"
    }
  }
  ```

- **Error interno do servidor:**

  Requisição: ***<i>htt://www.example.com/api/clients</i>***

  **`HEADER: Authorization / Bearer <token>`**

  **`BODY: { }`**

  <br>

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor."
  }
  ```
</details>

<br>

####  📝 Exemplos de requisições para atualizar os dados de um cliente do sistema

<details> <summary>Ver exemplos de uso</summary>

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

<br>

  > ***Pode-se usar o método `PUT` ou `PATCH` para atualizar os dados de um cliente. O método usado não altera o funcionamento da rota. Preferencialmente, use o método `PATCH` para atualizações parciais e o método `PUT` para atualizações completas. NÃO é possível utilizar um CPF inválido, certifique-se de utilizar um CPF com combinações válidas de números. Se precisar, utilize um gerador de numeros válidos para CPF. Exemplo: [4DEV](https://www.4devs.com.br/gerador_de_cpf)🚀***
  
  - **Método:** `PUT/PATCH`
  - **Endpoint:** `/api/clients/:id`
  - **Parâmetros:** `id`, `name`, `email`, `phone`, `cpf`
  - **Autenticação:** Requer autenticação

  <br>

**✅ Caso de sucesso:**

Requisição `METHOD:PUT`:

```json
{
  "name": "João Silva",
  "email": "jack@mail.com",
  "phone": "11 1 1111-1111",
  "cpf": "747.946.950-04"
}
```

Resposta:

```json
{
  "message": "Atualizado com sucesso.",
  "data": {
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04",
    "name": "João Silva",
  }
}
```

Requisição `METHOD:PATCH`:

```json
{
  "name": "João Silva",
  "email": "jack@mail.com",
  "phone": "11 1 1111-1111",
  "cpf": "747.946.950-04"
}
```

Resposta:

```json
{
  "message": "Atualizado com sucesso.",
  "data": {
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04",
    "name": "João Silva",
  }
}
```

  <br>

**❌ Casos de erro:**

<details> <summary>Ver Casos de Erro</summary>

  <br>

- **Cliente não encontrado ou id inválido:**

  Exemplo de entrada: `PUT/PATCH /api/clients/:id`

  Requisição: ***<i>htt://www.example.com/api/clients/999</i>***

  ```json
  {
    "name": "João Silva",
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04"
  }
  ```

  Resposta:

  ```json
  {
    "error": "Not found.",
    "message": "Cliente não encontrado."
  }
  ```

  <br>

- **Sem token ou token inválido:**

  Exemplo de entrada: `PUT/PATCH /api/clients/:id`

  Requisição:

   ```json
  {
    "name": "João Silva",
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04"
  }
  ```

  **`HEADER: Authorization / Bearer `**

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor.",
    "error": {
        "name": "JsonWebTokenError",
        "message": "jwt malformed"
    }
  }
  ```

  <br>

- **Token expirado:**

  Requisição:

   ```json
  {
    "name": "João Silva",
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04"
  }
  ```

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor.",
    "error": {
        "name": "TokenExpiredError",
        "message": "jwt expired"
    }
  }
  ```

  <br>

- **CPF com formato inválido:**

  Requisição:

    ```json
  {
    "name": "João Silva",
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04"
  }
  ```

  Resposta:

  ```json
  {
    "message": "CPF inválido."
  }
  ```

  <br>

- **Telefone com formato inválido:**

  Requisição:

   ```json
  {
    "name": "João Silva",
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04"
  }
  ```

  Resposta:

  ```json
  {
    "message": "Telefone inválido."
  }
  ```

  <br>

- **Email com formato inválido:**

  Requisição:

   ```json
  {
    "name": "João Silva",
    "email": "jack@mail.",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04"
  }
  ```

  Resposta:

  ```json
  {
    "message": "Email inválido."
  }
  ```

  <br>

- **Error ao salvar no banco de dados ou do servidor:**

  Requisição:

    ```json
  {
    "name": "João Silva",
    "email": "jack@mail.com",
    "phone": "11 1 1111-1111",
    "cpf": "747.946.950-04"
  }
  ```

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor."
  }
  ```

  </details>

</details>

<br>

####  📝 Exemplos de requisições para deletar um cliente do sistema

<details> <summary>Ver exemplos de uso</summary>

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

<br>

- **Método:** `DELETE`
- **Endpoint:** `/api/clients/:id`
- **Parâmetros:** `id`
- **Autenticação:** Requer autenticação

  <br>

**✅ Caso de sucesso:**

Requisição no endpoint: ***<i>htt://www.example.com/api/clients/1</i>***

**`HEADER: Authorization / Bearer <token>`**

**`BODY: { }`**

<br>

Resposta: **<i>StatusHTTP: 204 No Content</i>**

```json  
{
  
}
```

<br>

**❌ Casos de erro:**

<details> <summary>Ver Casos de Erro</summary>

  <br>

- **Cliente não encontrado ou id inválido:**

  Exemplo de entrada: `DELETE /api/clients/:id`

  Requisição: ***<i>htt://www.example.com/api/clients/999</i>***

  **`HEADER: Authorization / Bearer <token>`**

  **`BODY: { }`**

  <br>

  Resposta:

  ```json
  {
    "error": "Not found.",
    "message": "Cliente não encontrado."
  }
  ```

  <br>

- **Sem token ou token inválido:**

  Exemplo de entrada: `DELETE /api/clients/:id`

  Requisição: ***<i>htt://www.example.com/api/clients/1</i>***

  **`HEADER: Authorization / Bearer `**

  **`BODY: { }`**

  <br>

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor.",
    "error": {
        "name": "JsonWebTokenError",
        "message": "jwt malformed"
    }
  }
  ```

  <br>

- **Token expirado:**

  Requisição: ***<i>htt://www.example.com/api/clients/1</i>***

  **`HEADER: Authorization / Bearer <token>`**

  **`BODY: { }`**

  <br>

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor.",
    "error": {
        "name": "TokenExpiredError",
        "message": "jwt expired"
    }
  }
  ```

  <br>

- **Error interno do servidor:**

  Requisição: ***<i>htt://www.example.com/api/clients/1</i>***

  **`HEADER: Authorization / Bearer <token>`**

  **`BODY: { }`**

  <br>

  Resposta:

  ```json
  {
    "message": "Erro interno do servidor."
  }
  ```

  </details>

</details>

<br>

### 📦 Produtos

  A rota de produtos, `/api/products`, permite criar um novo produto no sistema, obter informações sobre o produto, atualizar os dados do produto e deletar produto.

  Ao cadastrar um novo produto, os dados do produto são validados e armazenados no banco de dados.

  A rota de produtos é protegida por autenticação JWT e requer um token válido para acesso. Os tokens JWT são gerados durante o processo de autenticação(login) e devem ser incluídos no cabeçalho `Authorization` das requisições protegidas. Um middleware de autenticação verifica a validade do token e permite o acesso apenas a usuários devidamente autenticados.

  As rotas protegidas verificam a validade do token e permitem o acesso apenas a usuários autenticados.

  O preço do produto é validado por meio de uma função específica que verifica se o preço é um número válido e se é maior que zero e possue 2 casas decimais. Essa validação assegura que o preço seja um número válido e positivo e que tenha 2 casas decimais para representar centavos.

  <br>

## 📚 Links uteis e referências

[Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

Links e referências para documentação adicional e recursos úteis

- [Queries SQL - Lucid ORM (doc)](https://lucid.adonisjs.com/docs/select-query-builder): Documentação sobre queries SQL com Lucid ORM.
- [Gerador de CPF](https://www.4devs.com.br/gerador_de_cpf): Gerador de CPF válido para testes.
- [Emojis](https://emojidb.org/node.js-emojis): Lista de emojis para usar em documentação.
- [AdonisJS](https://adonisjs.com/): Documentação oficial do AdonisJS.
- [Lucid ORM](https://lucid.adonisjs.com/docs/introduction): Documentação oficial do Lucid ORM.
- [Node.js](https://nodejs.org/en/): Documentação oficial do Node.js.
- [GIT](https://git-scm.com/): Documentação oficial do GIT.
- [TypeScript](https://www.typescriptlang.org/): Documentação oficial do TypeScript.
- [JWT](https://jwt.io/): Documentação oficial do JWT.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Documentação oficial do Bcrypt.
- [Docker](https://www.docker.com/): Documentação oficial do Docker.
- [Docker-compose](https://docs.docker.com/compose/): Documentação oficial do Docker-compose.
- [UUID - v4](https://www.npmjs.com/package/uuidv4): Documentação oficial do UUID v4.
- [Moment.js](https://momentjs.com/docs/): Documentação oficial do Moment.js.

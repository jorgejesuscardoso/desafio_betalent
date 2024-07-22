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

Também comtém informações sobre as rotas disponíveis, os métodos HTTP permitidos e os parâmetros necessários para cada uma delas.

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

  Aqui você encontrará uma visão geral detalhada da estrutura do projeto, incluindo configuração, funcionalidades e requisitos.

  ## 📦 Instalação e Execução

  [Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

  Instruções sobre como configurar o ambiente de desenvolvimento e realizar a instalação do projeto.

  ## 📝 Uso e Exemplos

  [Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

  Exemplos de uso e instruções sobre como interagir com a API ou outras partes do projeto.

  ## 📚 Documentação Adicional

  [Sumário](#sumário) | [Descrição do teste](#ℹ️-descrição-do-teste)

  Links e referências para documentação adicional e recursos úteis

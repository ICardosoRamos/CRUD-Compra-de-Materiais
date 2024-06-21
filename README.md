# Fluxo de aprovação para compra de materias de escritório

Um sistema que permite o cadastro de solicitação para compra de material de escritório e a possibilidade de aprovar a solicitação

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Observações Iniciais

Resolvi seguir alguns conceitos meus e por isso peço compreensão. Vamos lá:

Bom para começar, meu entendimento de 3 cenários foi no sentido processos, 3 coisas precisam ser possíveis, estar funcionando, cadastrar a solicitação, poder aprovar ela, e poder consultar as solicitações se baseando em filtro. Para isso criei uma tela principal, pois apesar de claramente parecer que a tela de aprovações seria em um local diferente e tmb com a tabela no banco separada, como é um sistema de teste, resolvi manter tudo junto para agilizar(a e tmb isso aconteceu dessa forma pois eu demorei mais que o esperado para construir o backend em Node.js, sei que a análise disse para usar minha preferência, mas como tinha uma sugestão resolvi seguí-la, imagino que vcs utilizam Node.js por aí e por isso já resolvi aprender para caso eu me saia bem rsrs. E outro problema foi me adaptar com o sql server, uso normalmente Linux para desenvolvimento de software no geral, mas sql server por algum motivo não rodou no meu e tive que usar Windows para terminar o projeto com o sql server que era exigência.), bom continuando, ao manter tudo junto já que é um projeto teste, eu consigo deixar mais visual e com um toque a mais de Design, fiz o seguinte, uma lista de solicitações estilizadas, em cada solicitação o botão para abrir o modal que aprova e reprova a solicitação, essa parte não está bem visual pq não deu tempo, ent quando aprova ou reprova tem que verificar no banco a mudança do valor BIT.
Outra observação é que coloquei uma Side Nav Bar do lado esquerdo, animada, e com várias telas kkkkk, mas a ideia é só mostrar a possibilidade dos sub-menus e tudo mais, a unica tela que funciona de vdd é a tela de Solicitações, afinal é nela que se encontrão os requisitos do projeto.
A terceira observação é que infelizmente não consegui adicionar o input de observação na hora de reprovar a solicitação, como disse antes, tive problemas que tomaram muito tempo com Node.js e sql server já que eu não conhecia nenhum dos dois.
E por último, tmb triste pois se tivesse um pouquinho mais de tempo conseguiria entregar é a questão dos testes unitários.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
Node com o NPM Package Manager para poder instalar os pacotes de cada pasta, backend e frontend, a CLI do Angular para poder executar o comando "ng serve" e o sql server(usei na minha máquina o 2022) com o db correto e a tabela, deixarei um script aqui que precisa ser executado no SQL SERVER MANAGEMENT STUDIO.
```

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Clone o projeto:

```
git clone git@github.com:ICardosoRamos/entrevista_senior.git
```

Abra dois terminais:

No primeiro entre na pasta frontend e execute:

```
npm i -f && ng serve
```

No segundo entre na pasta backend e execute:

```
npm i -f && npm start
```

Aqui segue o script para executar o que é necessário no sql server management studio:

```
-- Cria o database
CREATE DATABASE entrevista_senior;
GO

-- Usa o banco de dados "entrevista_senior"
USE entrevista_senior;
GO

-- Cria a tabela "Solicitacoes"
CREATE TABLE Solicitacoes (
    ID INT IDENTITY NOT NULL PRIMARY KEY,
    nome_solicitante NVARCHAR(100),
    descricao_produto NVARCHAR(100),
	preco DECIMAL(10, 2),
    aprovado BIT NOT NULL
);
GO
```

## ⚙️ Executando os testes

Infelizmente não tive tempo de adicionar essa parte.

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Angular](https://angular.dev/overview) - O framework web usado.
* [Angular Material](https://material.angular.io/components/categories) - Biblioteca com componentes Material Design para Angular.
* [Node.js](https://nodejs.org/docs/latest/api/) - Servidor backend.
* [Express](https://expressjs.com/pt-br/starter/installing.html) - Biblioteca para criar APIs no Node.js.
* [Tedious](https://tediousjs.github.io/tedious/) - Pacote para conectar com o banco sql server.
* [SQL SERVER](https://learn.microsoft.com/pt-br/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-ver16) - Database utilizado.

## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Irwyng Cardoso Ramos** - *Trabalho Total* - [ICardosoRamos](https://github.com/ICardosoRamos)

---
⌨️ com ❤️ por [Irwyng Cardoso Ramos](https://github.com/ICardosoRamos) Será ótimo aprender mais com vocês se o retorno for positivo. Vlw😊

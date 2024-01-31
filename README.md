# NodeJS REST API Transactions

## Descrição

Este repositório contém o código fonte de uma API REST desenvolvida em Node.js utilizando o Fastify, Knex, TypeScript e outras ferramentas.

### A API atende aos seguintes requisitos funcionais:

- O usuário deve poder criar uma nova transação;
- O usuário deve poder obter um resumo da sua conta;
- O usuário deve poder listar todas transações que já ocorreram;
- O usuário deve poder visualizar uma transação única;
- A API também atende às seguintes regras de negócio:

### A API atende as seguintes regras de negócios:

- A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- Deve ser possível identificarmos o usuário entre as requisições;
- O usuário só pode visualizar transações o qual ele criou;

## Instalação

Para instalar a API, execute os seguintes comandos:

```bash
git clone https://github.com/gildembergleite/nodejs-rest-api-transactions.git
cd nodejs-rest-api-transactions
npm install
```

## Execução

Para executar a API, insira as variáveis de ambiente como no arquivo .env.example e execute o seguinte comando:

```bash
npm run dev
```

A API estará disponível em http://localhost:3333. (ou a porta que definiu em .env)

## Testes

Para executar os testes da API, execute o seguinte comando:

```bash
npm run test
```

## Contribuições

Contribuições são sempre bem-vindas. Para contribuir, basta criar uma issue ou um pull request.

## Licença

A API está licenciada sob a licença MIT.

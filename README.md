# Simple Gram

Simple Gram é um mini blog simples onde você pode postar qualquer coisa sem a necessidade de login ou autenticação. Este projeto tem como objetivo principal ampliar as boas práticas no desenvolvimento com React, incluindo testes de diversos tipos e o uso de ferramentas modernas.

---

## 🚀 Funcionalidades

- Postagens públicas sem autenticação.
- Gerenciamento de estados assíncronos com **React Query**.
- API simulada com **JSON Server**.
- Testes unitários, testes de mutação, testes de componentes e testes de ponta a ponta (e2e).

---

## 🛠️ Configuração e Execução

1. Instale as dependências:

   ```bash
   npm i
   ```

   ou

   ```bash
   yarn add
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Inicie o servidor da API:

   ```bash
   npm run server
   ```

4. Acesse a aplicação em: http://localhost:5173.

---

## 📂 Estrutura de Comandos (Scripts)

### Desenvolvimento

- `dev`: Inicia o servidor de desenvolvimento do Vite.

  ```bash
  npm run dev
  ```

- `server`: Inicia o servidor da API utilizando o JSON Server

  ```bash
  npm run server
  ```

### Build e Preview

- `build`: Realiza os testes(unitários, de componentes e e2e) e, em seguida, gera os arquivos para produção.

  ```bash
  npm run build
  ```

- `preview`: Inicia um servidor local para pré-visualizar a versão de produção.

  ```bash
  npm run preview
  ```

### Testes

#### Unitários

- `test:unit`: Executa os testes unitários com jest

  ```bash
  npm run test:unit
  ```

- `test:watch`: Executa os testes unitários em modo de observação.

  ```bash
  npm run test:watch
  ```

- `test:coverage`: Gera o relatório de cobertura dos testes unitários.

  ```bash
  npm run test:coverage
  ```

#### Componentes

- `test:component`: Executa os testes de componentes com Cypress.

  ```bash
  npm run test:component
  ```

#### Ponta a Ponta (e2e)

- `test:e2e`: Execita os testes e2e com Cypress (o server já está ligado).

  ```bash
  npm run test:e2e
  ```

- `test:e2e:dev`: Inicia o servidor de desenvolvimento e, em seguida, executa os testes e2e.

  ```bash
  npm run test:e2e:dev
  ```

- `cy:open`: Abre o painel interativo do Cypress.

  ```bash
  npm run cy:open
  ```

#### Testes de mutação

- `stryker`: Executa os testes de mutação com Stryker.

  ```bash
  npm run stryker
  ```

#### Teste geral

- `test`: Executa os testes unitários, de componentes e e2e.

  ```bash
  npm run test
  ```

## 🌟 Melhorias Adicionais

- Adicionar mais estilos com configurações detalhadas no ESLint.
- Configurar o React Query DevTools para debugging.
- Expandir os testes com cenários adicionais.

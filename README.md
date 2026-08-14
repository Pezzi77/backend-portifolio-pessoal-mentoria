# API de Academia

API REST criada com Express para cadastrar instrutores, cadastrar alunos, gerenciar fichas de treino e registrar frequência. A autenticação usa JWT via middleware, com perfis distintos para instrutor e aluno.

## Funcionalidades
- Cadastro de instrutor
- Cadastro de aluno sem necessidade de autorização do instrutor
- Login de instrutor e aluno com JWT
- Consulta de lista de alunos para instrutores
- Consulta de dados de aluno
- Cadastro e atualização de ficha pelo instrutor
- Consulta de ficha do aluno autenticado
- Registro de frequência do aluno autenticado
- Documentação Swagger disponível em `/api-docs`

## Estrutura do projeto
- `src/routes`: definição das rotas da API
- `src/controllers`: tratamento das requisições
- `src/services`: regras de negócio
- `src/models`: armazenamento em memória
- `src/middlewares`: autenticação e autorização
- `docs`: documentação Swagger

## Como executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` na raiz do projeto com a variável abaixo:
   ```env
   BASE_URL=http://localhost:3000
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
4. Acesse a documentação Swagger em:
   ```text
   http://localhost:3000/api-docs
   ```
## Credenciais iniciais para instrutor:
- email: felipe@academia.com
- senha: 123456

## Exemplos de uso

- Para cadastrar um instrutor, apenas outro instrutor já cadastrado consegue a solicitação. Utilizar as credenciais iniciais.
- Para cadastrar um aluno, envie o nome, e-mail, senha e informações físicas do aluno em uma requisição de cadastro.
- Para fazer login, envie as credenciais de e-mail e senha e receba um token JWT para autenticação.
- Para consultar a ficha do aluno, utilize o token JWT na requisição e solicite os dados de ficha associados ao aluno autenticado.
- Para registrar frequência, envie a data da presença juntamente com o token JWT do aluno.

## Testes
```bash
npm test
```

# API de Academia

API REST criada com Express para registrar instrutores, registrar alunos, ficha de treino, registrar a frequência e consultar a progressão. A autenticação é feita com JWT via middleware, com perfis distintos para instrutor e aluno.

## Funcionalidades
- Cadastro de instrutor
- Cadastro de aluno
- Login com JWT para instrutor e aluno
- Busca de alunos
- Instrutores acessam todas as rotas de cadastro e consulta administrativa.
- Alunos fazem login e consultam apenas o próprio progresso.
- Busca de dados de aluno
- Anexo da ficha
- Consulta da ficha de treino
- Registro de frequência de dias

## Estrutura do projeto
- routes: definição das rotas da API
- controllers: tratamento das requisições
- services: regras de negócio
- models: armazenamento em memória
- middlewares: autenticação e autorização
- docs: arquivo Swagger

## Como executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a aplicação:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger em:
   ```text
   http://localhost:3000/api-docs
   ```

## Exemplos de uso
### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"felipe@academia.com","password":"123456"}'
```

## Testes
```bash
npm test
```

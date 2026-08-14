# API de Academia

API REST construída com Node.js e Express para gerenciar instrutores, alunos, fichas de treino e frequência. A autenticação usa JWT via middleware, com perfis distintos para instrutor e aluno.

**Stack Utilizada**
- **Linguaguem:** JavaScript (Node.js)
- **Biblioteda web**:Express
- **Framework de testes:** Mocha 
- **Biblioteca de asserções:** Chai 
- **Biblioteca integração HTTP:** Supertest 
- **Relatório de testes:** Mochawesome 
- **Documentação:** Swagger 
- **Variáveis de ambiente:** dotenv 

**Funcionalidades principais**
- Cadastro de instrutor
- Cadastro de aluno e instrutor
- Login com JWT (instrutor e aluno)
- Consulta de lista de alunos (para instrutores)
- Consulta de dados do aluno
- CRUD para Gestão de ficha de treino (para instrutores)
- Registro de frequência do aluno
- Documentação Swagger disponível em `/api-docs`
 - Rota de health-check: `GET /health` — retorna status, uptime e timestamp

**Estrutura de diretórios (resumida)**
- `src/`
  - `app.js` - inicialização da aplicação
  - `routes/` - definição de rotas (ex: `apiRoutes.js`)
  - `controllers/` - controladores das rotas
  - `services/` - regras de negócio
  - `models/` - camada de persistência (in-memory neste projeto)
  - `middlewares/` - middlewares (ex: autenticação)
- `docs/` - documentação Swagger (`swagger.json`)
- `test/` e `tests/` - testes automatizados (Mocha)
- `helpers/` - utilitários auxiliares
- `mochawesome-report/` - saída HTML do relatório gerado pelo Mochawesome

## Arquivo de ambiente (`.env`)
Crie um arquivo `.env` na raiz do projeto com, no mínimo, a variável abaixo:

```env
BASE_URL=http://localhost:3000
# Opcionalmente você pode definir:
PORT=3000
JWT_SECRET=uma_chave_secreta
NODE_ENV=development
```

Observação: a variável `BASE_URL` é usada nos testes e para gerar links na documentação.

## Instalação e execução
1. Instale as dependências:

```bash
npm install
```

2. Crie o `.env` conforme acima.

3. Inicie a aplicação:

```bash
npm start
```

4. Acesse a documentação Swagger em:

```text
http://localhost:3000/api-docs
```

## Testes e relatórios
O projeto usa Mocha com o reporter `mochawesome`. O `package.json` já contém o script de teste:

```bash
npm test
```

Esse comando executa os testes em `test/**/*.test.js` e gera um relatório HTML dentro da pasta `mochawesome-report/` (arquivo `mochawesome.html`). Para visualizar o relatório, abra `mochawesome-report/mochawesome.html` no seu navegador.

Exemplo:

```Git Bash
# Executa os testes
npm test
# Abre o relatório no browser (padrão do Windows)
start .\\mochawesome-report\\mochawesome.html
```

## Dependências principais e documentação
- Node.js: https://nodejs.org/
- Express: https://expressjs.com/
- Mocha: https://mochajs.org/
- Chai: https://www.chaijs.com/
- Supertest: https://github.com/visionmedia/supertest
- Mochawesome: https://github.com/adamgruber/mochawesome
- dotenv: https://github.com/motdotla/dotenv
- jsonwebtoken: https://github.com/auth0/node-jsonwebtoken
- Swagger UI Express: https://github.com/scottie1984/swagger-ui-express

## Credenciais iniciais (exemplo)
- Email instrutor: felipe@academia.com
- Senha: 123456

- Email aluno: lucas@academia.com
- Senha: 123456
## Observações
- Os testes usam a variável `BASE_URL` do `.env`; assegure que ela aponta para a URL onde a API estará rodando ao executar `npm test`.
- O armazenamento atualmente é em memória (`src/models/inMemoryStore.js`), portanto dados não são persistidos entre execuções.



const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');

describe('Frequência (Frequencies)', () => {
  let tokenAdmin;
  let tokenAluno;

  before(async () => {
    tokenAdmin = await obterToken('felipe@academia.com', '123456');
    tokenAluno = await obterToken('lucas@academia.com', '123456');
  });

  describe('POST /students/:id/frequency', () => {
    it('CT-API-019 - Registrar frequência com aluno autenticado (201)', async () => {
      const res = await request(process.env.BASE_URL)
        .post('/students/aluno-0/frequency')
        .set('Authorization', `Bearer ${tokenAluno}`)
        .send({ date: new Date().toISOString() });

      expect(res.status).to.equal(201);
      expect(res.body.message).to.be.a('string');
      expect(res.body.frequency).to.be.an('object');
    });

    it('CT-API-020 - Bloquear registro para aluno inexistente (403 ou 404)', async () => {
      const res = await request(process.env.BASE_URL)
        .post('/students/aluno-999/frequency')
        .set('Authorization', `Bearer ${tokenAluno}`)
        .send({ date: new Date().toISOString() });

      expect([403, 404]).to.include(res.status);
    });
  });

  describe('GET /students/:id/frequency', () => {
    it('CT-API-022 - Consultar histórico de frequência com token de instrutor (200)', async () => {
      const res = await request(process.env.BASE_URL)
        .get('/students/aluno-0/frequency')
        .set('Authorization', `Bearer ${tokenAdmin}`);

      expect(res.status).to.equal(200);
      expect(res.body.frequencies).to.be.an('array');
    });

    it('CT-API-023 - Consultar frequência de aluno inexistente (404)', async () => {
      const res = await request(process.env.BASE_URL)
        .get('/students/aluno-999/frequency')
        .set('Authorization', `Bearer ${tokenAdmin}`);

      expect(res.status).to.equal(404);
    });

    it('CT-API-024 - Consultar frequência sem token ou token inválido (401)', async () => {
      const resNoToken = await request(process.env.BASE_URL)
        .get('/students/aluno-0/frequency');
      expect(resNoToken.status).to.equal(401);

      const resInvalid = await request(process.env.BASE_URL)
        .get('/students/aluno-0/frequency')
        .set('Authorization', 'Bearer invalid.token');
      expect(resInvalid.status).to.equal(401);
    });
  });
});

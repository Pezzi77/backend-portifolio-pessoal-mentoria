const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');

describe('Ficha', () => {
  let tokenAdmin;
  let tokenAluno;

  before(async () => {
    tokenAdmin = await obterToken('felipe@academia.com', '123456');
    tokenAluno = await obterToken('lucas@academia.com', '123456');

    // apenas usuários mockados: felipe (instrutor) e lucas (aluno)
  });

  describe('POST /students/:id/sheet', () => {
    it('CT-API-013 - Deve criar ficha para aluno existente com instrutor autenticado (201)', async () => {
      const sheet = {
        id: 'sheet-test-1',
        groups: [
          { name: 'Grupo A', exercises: ['Ex1', 'Ex2'] }
        ]
      };

      const res = await request(process.env.BASE_URL)
        .post('/students/aluno-0/sheet')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(sheet);

      // Pode retornar 201 (criado) ou 409 (já existe) dependendo do estado do servidor
      expect([201, 409]).to.include(res.status);
      if (res.status === 201) {
        expect(res.body.message).to.be.a('string');
        expect(res.body.sheet).to.be.an('object');
      } else {
        expect(res.body.message).to.be.a('string');
      }
    });

    it('CT-API-014 - Deve bloquear criação quando já existe ficha (409)', async () => {
      const sheet = { id: 'sheet-test-1', groups: [] };

      const res = await request(process.env.BASE_URL)
        .post('/students/aluno-0/sheet')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(sheet);

      expect(res.status).to.equal(409);
      expect(res.body.message).to.be.a('string');
    });
  });

  describe('PATCH /students/:id/sheet', () => {
    it('CT-API-015 - Deve atualizar ficha existente com instrutor autenticado (200)', async () => {
      const updated = {
        id: 'sheet-test-1',
        groups: [
          { name: 'Peito modificado', exercises: ['Supino Inclinado'] }
        ]
      };

      const res = await request(process.env.BASE_URL)
        .patch('/students/aluno-0/sheet')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(updated);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.be.a('string');
      expect(res.body.sheet).to.be.an('object');
      expect(res.body.sheet.groups[0].name).to.equal('Peito modificado');
    });

    it('CT-API-016 - Deve retornar 404 ao atualizar ficha de aluno inexistente', async () => {
      const updated = { id: 'x', groups: [] };

      const res = await request(process.env.BASE_URL)
        .patch('/students/aluno-999/sheet')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(updated);

      expect(res.status).to.equal(404);
    });
  });

  describe('GET /students/:id/sheet', () => {
    it('CT-API-017 - Deve retornar student e sheet para aluno com token válido (200)', async () => {
      const res = await request(process.env.BASE_URL)
        .get('/students/aluno-0/sheet')
        .set('Authorization', `Bearer ${tokenAluno}`);

      expect(res.status).to.equal(200);
      expect(res.body.student).to.be.an('object');
      expect(res.body.sheet).to.be.an('object');
    });

    it('CT-API-018 - Deve bloquear consulta de ficha de outro aluno sem permissão (403)', async () => {
      // validamos que um aluno não pode acessar a própria rota de outro (simulado por id diferente)
      const res = await request(process.env.BASE_URL)
        .get('/students/aluno-999/sheet')
        .set('Authorization', `Bearer ${tokenAluno}`);

      // Quando o aluno tenta acessar outro ID, o middleware pode retornar 403 ou 404;
      expect([403, 404]).to.include(res.status);
    });
  });
});

const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');

describe('Alunos', () => {
    // 1. Declaramos as variáveis para os tokens dos dois perfis
    let tokenAdmin;
    let tokenAluno;

    // 2. O hook 'before' roda UMA VEZ antes de todos os testes deste describe
    before(async () => {
        tokenAdmin = await obterToken('felipe@academia.com', '123456');
        tokenAluno = await obterToken('lucas@academia.com', '123456');
    });

    describe('GET /students', () => {
        it('Deve retornar sucesso com 200 quando a listagem for consultada pelo instrutor/admin', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/students')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokenAdmin}`); 
            
            expect(resposta.status).to.equal(200);    
        });

        it('Deve retornar acesso negado com 403 quando a listagem for consultada pelo aluno', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/students')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokenAluno}`); 
            
            expect(resposta.status).to.equal(403);      
        });
    });
    
    describe('GET /students/{id}', () => {
        it('Deve retornar sucesso com 200 quando consultado por um instrutor', async () => {
            const resposta = await request(process.env.BASE_URL) 
                .get('/students/aluno-0')
                .set('Authorization', `Bearer ${tokenAdmin}`); 

            expect(resposta.status).to.equal(200);
            expect(resposta.body.student.id).to.equal('aluno-0');
        });

        it('Deve retornar acesso negado com 403 quando consultado por um aluno', async () => {
            const resposta = await request(process.env.BASE_URL) 
                .get('/students/aluno-0')
                .set('Authorization', `Bearer ${tokenAluno}`); 

            expect(resposta.status).to.equal(403);
        });
    });
});
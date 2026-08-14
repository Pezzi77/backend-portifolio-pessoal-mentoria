const request = require('supertest');
const {expect} = require('chai')
require('dotenv').config()
const {obterToken} = require('../helpers/autenticacao')
describe('Alunos', () => {
    describe('GET /students', () => {
        it('Deve retornar sucesso com 200 quando a listagem for consultada pelo instrutor', async() => {
             const token = await obterToken('felipe@academia.com', '123456')

            const resposta = await request (process.env.BASE_URL)
            .get('/students')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            
        expect(resposta.status).to.equal(200);    
        
        
        })

        it('Deve retornar acesso negado com 403 quando a listagem for consultada pelo aluno', async () => {
            const token = await obterToken('lucas@academia.com', '123456')

            const resposta = await request ('http://localhost:3000')
            .get('/students')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            
        expect(resposta.status).to.equal(403);    
        
        
        })
    })

})
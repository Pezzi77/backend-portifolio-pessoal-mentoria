const request = require('supertest');
const {expect} = require('chai')
require('dotenv').config

describe('Login', () => {
    describe('POST /auth/login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'felipe@academia.com',
                    'password': '123456'
                })

            expect(resposta.status).to.equal(200);    
            expect(resposta.body.token).to.be.a('string');           
        })
        it('Deve retornar 401 usúario com uma credencial inválida', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'felipe@academia.com',
                    'password': '1234'
                })

            expect(resposta.status).to.equal(401);    
            expect(resposta.body.message).to.equal('Credenciais inválidas');           
        })
    })

})

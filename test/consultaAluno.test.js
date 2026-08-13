const request = require('supertest');
const {expect} = require('chai')

describe('Alunos', () => {
    describe('GET /students', () => {
        it('Deve retornar sucesso com 200 quando a listagem for consultada pelo instrutor', async() => {
             const respostaLoginInstrutor = await request('http://localhost:3000')
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'felipe@academia.com',
                    'password': '123456'
                })

            const token = respostaLoginInstrutor.body.token

            const resposta = await request ('http://localhost:3000')
            .get('/students')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            
        expect(resposta.status).to.equal(200);    
        
        
        })

        it('Deve retornar acesso negado com 403 quando a listagem for consultada pelo aluno', async () => {
            const respostaLoginAluno = await request('http://localhost:3000')
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'lucas@academia.com',
                    'password': '123456'
                })

            const token = respostaLoginAluno.body.token

            const resposta = await request ('http://localhost:3000')
            .get('/students')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            
        expect(resposta.status).to.equal(403);    
        
        
        })
    })

})
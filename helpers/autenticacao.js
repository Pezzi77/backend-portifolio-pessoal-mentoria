const request = require('supertest');

const obterToken =  async (usuario, senha) => {
    const respostaLogin = await request(process.env.BASE_URL)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': usuario,
                'password': senha
            })

        return respostaLogin.body.token
}

module.exports = {
    obterToken
}
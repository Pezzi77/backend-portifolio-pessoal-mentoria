const postLogin = JSON.parse(open('../fixtures/postLogin.json'));
import http from 'k6/http'

export function obterToken() {
    const url = 'http://localhost:3000/auth/login';

    const payload = JSON.stringify(postLogin)

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const res = http.post(url, payload, params)

    return res.json('token')
}
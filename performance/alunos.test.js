import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from './../helpers.k6/autenticacao.js';

export const options = {
  iterations: 1
};

export default function() {
  const token = obterToken ()

  const url = 'http://localhost:3000/students'

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }

  let res = http.get(url, params)
  check(res, { 
    "status is 200": (res) => res.status === 200 
  });
  
  sleep(1);
}

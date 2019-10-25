const express = require('express');

const server = express(); //chama a função do express

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Saron", "email": "saron@gmail.com"}

//localhost:3000/teste, query params
/*
server.get('/teste', (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
})
*/

// Via Route params
/*
server.get('/users/:id', (req, res) => {
  const {id} = req.params; 

  return res.json({ message: `Buscando o usuário ${id}` });
})
*/

// Request body

const users = ['Saron', 'Medeiros', 'Philippi'];

server.get('/users/:index', (req, res) => {
  const { index } = req.params; 

  return res.json(users[index]);
})

server.listen(3000); //ouve a porta entre parenteses 
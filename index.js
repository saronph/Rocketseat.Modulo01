const express = require('express');

const server = express(); //chama a função do express

server.use(express.json()); //faz o express ler json

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

//Middlewares

server.use((req, res, next) => {
  console.time('request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('request');
});

//condicional para ver se existe o 'name' no corpo da requisição

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required'});
  }

  return next();
}

//condicional para ver se existe o 'name' solicitado

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {

    return res.status(400).json({ error: 'User does not exists'});
  }

  req.user = user;

  return next();
}

// CRUD - Create, Read, Update, Delete

//consulta todos os usuários
server.get('/users', (req, res) => {
  return res.json(users);
})

//cria usuário
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//edição do usuário
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) =>{
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

//exclusão de usuários
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1); //splice percorre o vetor em index, e deletara 1 posição

  return res.send();
});

server.get('/users/:index', checkUserInArray, (req, res) => {  

  return res.json(req.user);
})

server.listen(3000); //ouve a porta entre parenteses 
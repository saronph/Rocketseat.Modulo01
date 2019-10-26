const express = require('express');

const server = express(); 

server.use(express.json()); 

const projects = [{
    id: "1",
    title: 'Novo Projeto',
    tasks: []
  }, {
    id: "2",
    title: 'Novo Projeto2',
    tasks: []
  }, {
    id: "3",
    title: 'Novo Projeto3',
    tasks: []
  }];

//Middlewares - verifica id
  function checkProjectInArray(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
  
    if (!project) {
  
      return res.status(400).json({ error: 'Project does not exists'});
    }
  
    req.project = project;
  
    return next();
  };

//Middlewares - contagem requisições
  function numRequests(req, res, next) {
    
    console.count("Quantidades de requisições");
  
    return next();  
    
  };

//método post
server.post('/projects', (req, res) => {

const { id, title } = req.body;

const project = {
  id,
  title,
  tasks: []
};

projects.push(project);

return res.json(project); 
})

//método get all
server.get('/projects', numRequests, (req, res) => {

  return res.json(projects);

});

//método editar = put
server.put('/projects/:id', checkProjectInArray, numRequests, (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);

});

//delete
server.delete('/projects/:id', checkProjectInArray, numRequests, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

//adicionar tarefa
server.post('/projects/:id/tasks', checkProjectInArray, numRequests,  (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);

});


server.listen(3000);

    
const express = require("express");
const server = express();

// Pegar o banco de dados o arquivo db.js
const db = require("./database/db.js");

// Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

// Configurar página pública
server.use(express.static("public"));

// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
});

// Configurando as rotas
server.get("/", (req, res) => {
  return res.render("index.html")
});

server.get("/create-point", (req, res) => {  
  return res.render("create-point.html")
});

// Pegar os dados do formulário e salvar no banco de dados
server.post("/savepoint", (req, res) => {
  //console.log(req.body);
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);`
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]
  
  function afterInsertData(err) {
    if(err) {
      console.log(err);
      return res.render("create-point.html", { error: true })// retorna em tela para o usuario
    }
    //console.log("Cadastrado com Sucesso.");
    //console.log(this)
    return res.render("create-point.html", { saved: true });
  }
  db.run(query, values, afterInsertData);  
});


server.get("/search", (req, res) => {

  const search = req.query.search;

  if(search == "" ) {
    return res.render("search-results.html", { total: 0 });
  }

  // Pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) {
      return console.log(err);
    }

    const total = rows.length

    //console.log("Aqui está seus registros.");
    //console.log(rows);
    // mostrar a página htmk com os dados do bando de dados
    return res.render("search-results.html", { places: rows, total: total});
  })
  
});

// Ligar o servidor na porta 3000
server.listen(3000);
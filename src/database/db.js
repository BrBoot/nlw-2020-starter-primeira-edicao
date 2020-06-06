// Importa a dependecia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// criar o objeto para criar o banco de dados
const db = new sqlite3.Database("./src/database/database.db");

// utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
  // criar uma tabela
  /*db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

  // Inserir dados na tabela
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
    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    "Papersider",
    "Rua Mirandópolis, Jd Ipaussurama",
    "N°: 300 ",
    "São Paulo",
    "Campinas",
    "Papéis e Papelão"
  ]
  
  function afterInsertData(err) {
    if(err) {
      return console.log(err);
    }
    console.log("Cadastrado com Sucesso.");
    console.log(this)
  }
  db.run(query, values, afterInsertData);

   //Consultar os dados da tabela
  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err);
    }
    console.log("Aqui está seus registros.");
    console.log(rows);
  })
      
  //Deletar um dado da tabela
 db.run(`DELETE FROM places WHERE id = ?`, [6], function(err){
    if(err) {
      return console.log(err);
    }
    console.log("Registro deletado com sucesso.");
  });*/
  
});

module.exports = db;
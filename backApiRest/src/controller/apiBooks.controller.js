const connection = require("../dataBase")



function postRegister(request, response){
    const {name, last_name, email, photo, password} = request.body;
    const sql = `INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)`;
    const params = [name, last_name, email, photo, password];
    
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Error al agregar usuario");
      } else {
        console.log(result);
        if (result.insertId) {
          response.status(201).json({ message: "Usuario agregado", id: result.insertId });
        } else {
          response.status(500).send("Error al agregar usuario");
        }
      }
    });
}

function postLogin(request, response){
    const {email, password} = request.body;
    const sql = `SELECT name, last_name, email, photo FROM user WHERE email =? AND password = ?`;
    const params = [email, password];
    
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Login incorrecto");
      } else {
        console.log(result);
        if (result.length>0) {
          response.status(200).json(result);
        } else {
          response.status(401).send("Login incorrecto");
        }
      }
    });
}


module.exports = {postRegister, postLogin}
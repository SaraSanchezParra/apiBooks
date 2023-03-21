const connection = require("../dataBase");
const Book = require('../models/book');



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
    const sql = `SELECT * FROM user WHERE email =? AND password = ?`;
    const params = [email, password];
    
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Login incorrecto");
      } else {
        console.log(result);
        if (result.length>0) {
          console.log(result);
          response.status(200).json(result);
        } else {
          response.status(401).send("Login incorrecto");
        }
      }
    });
}



function getStart(request, response) {
    let respuesta = {error: true, codigo: 200, mensaje: 'Beginning point'};
    response.send(respuesta);
}

function getBook(request, response) {
  let id = request.params.id;
  let sql = "SELECT * from book WHERE Id_book"
  const params = [id];
  let respuesta;

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      response.status(500).send("No se ha podido obtener el libro");
    } else {
      console.log(result);
      if (result.length>0) {
        response.status(200).json(result);
      } else {
        response.status(404).send("Libro no encontrado");
      }
    }
  });
}


function getAllBooks(request, response) {
    let respuesta;
    let id = request.query.id_user;
    const params = [id];
    let sql = "SELECT * from book WHERE id_user = ?"

    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Error al obtener todos los libros");
      } else {
        console.log(result);

          response.status(200).json(result);

      }
    });
}


function postBook(request, response) {
    let respuesta;
    let sql = "INSERT into book (id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)";
    const {id_user, title, type, author, price, photo} = request.body;
    const params = [id_user, title, type, author, price, photo];
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Error al agregar libro");
      } else {
        console.log(result);
        if (result.insertId) {
          response.status(201).json({ message: "Libro agregado", id: result.insertId });
        } else {
          response.status(500).send("Error al agregar libro");
        }
      }
    });
}


function putBook(request, response) {
  let sql = "UPDATE book SET id_user=?, title=?, type=?, author=?, price=?, photo=? WHERE id_book =?";
  const {id_user, title, type, author, price, photo, id_book} = request.body;
  const params = [ id_user, title, type, author, price, photo, id_book];
  connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Error al modificar libro");
      } else {
        console.log(result);
        if (result.affectedRows==1) {
          response.status(200).json({ message: "Libro modificado"});
        } else {
          response.status(500).send("Error al modificar libro");
        }
      }
    });
}


function deleteBook(request, response) {
    let id = request.params.id;
    let sql = "DELETE FROM Book WHERE Id_book=?";
    const params = [id];
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.log(err);
        response.status(500).send("Error al eliminar libro");
      } else {
        console.log(result);
        if (result.affectedRows==1) {
          response.status(200).json({ message: "Libro borrado"});
        } else {
          response.status(500).send("Error al eliminar libro");
        }
      }
    });
};

module.exports = {getStart, getBook, postBook, putBook, deleteBook, getAllBooks, postRegister, postLogin};



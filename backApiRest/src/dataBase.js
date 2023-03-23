const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "12345678",
        database : "AppBooks"
    });

    connection.connect(function(error){
        if(error){
            console.log(error);
        }else{
            console.log('Conexión correcta.');
        }
    });

    module.exports = connection;
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'laburapp'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('La base de datos se conecto')
    }
});


module.exports = mysqlConnection;

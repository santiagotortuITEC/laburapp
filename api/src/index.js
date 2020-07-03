const express = require('express');
const app = express();

//Configuraciones
app.set('port',process.env.PORT || 3000);

//Middlewares (funciones que se ejecutan antes de las funciones)
app.use(express.json());  //>Entiende los Json a traves de Express

//Routes
app.use(require('./routes/usuarios'));

//Iniciando servidor
app.listen(app.get ('port'),() =>{
    console.log ('Server on PORT', app.get('port'));
});
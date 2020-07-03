const express =require ('express');
const router =express.Router();

const mysqlConnection = require ('../database');

//Traigo todos los usuarios de la tabla usuarios, al ingresar a /usuarios
router.get('/usuarios',(req,res)=>{
    mysqlConnection.query('Select * From usuarios',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

//Traer un ususario en particular al ingresar a usuarios/id
router.get('/usuarios/:id', (req, res) => {
    const {id} =req.params;
    mysqlConnection.query('Select * From usuarios where id_usuarios = ?',[id], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

//Creo un usuario
router.post('/nuevousuario', (req, res) => {
    let data = { name_usuarios, lastname_usuarios, usuarios_usuarios, email_usuarios, phone_usuarios, pass_usuarios }=req.body;
    
    //TODO ==>>Verifico que el email no este registrado previamente
    mysqlConnection.query('Select * From usuarios where email_usuarios = ?', [email_usuarios], (err, rows, fields) => {

        if (rows.length > 0) { //TODO ==>>Si la fila es mayor a cero es porq existe un email, y no lo almacenara
            res.send(JSON.stringify({ "status": 200, "error": 'El email ya se registro previamente',"email":"Registrado Previamente"}));

        }else{
            
            let sql = "INSERT INTO usuarios SET ?";   //TODO ==>>ESTO "SET" es un formato de escribir la consulta, solo eso
            let query = mysqlConnection.query(sql, data, (err, results) => {
                if (err) throw err;
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            });
        }
    })
});









module.exports = router;
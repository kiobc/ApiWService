const conexion=require('./conexion');
var Categoria=require('./categoria');
var express=require('express');
var bodyParser= require('body-parser');
var cors = require('cors');
const { request, response } = require('express');
const dbcategoria = require('./dbcategoria');
var app=express();
var router=express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);
router.route('/categoria').get((request,response)=>{
dbcategoria.getCategoria().then(result=>{
    response.json(result[0]);
})
});

//ruta por id
router.route('/categoria/:id').get((request,response)=>{
    dbcategoria.getCategoriaxid(request.params.id).then(result=>{
        response.json(result[0]);
    })
    });
    //guardar categoria
    router.route('/categoria/guardar').post((request,response)=>{
        let categoria={...request.body}
        dbcategoria.insertCategoria(categoria).then(result=>{
            response.json(result[0]);
        })
        });   

//modificar categoria
router.route('/categoria/modificar').post((request,response)=>{
    let categoria={...request.body}
    dbcategoria.updateCategoria(categoria).then(result=>{
        response.json(result[0]);
    })
    });  

//*TODO Borrar categoria
    router.route('/categoria/borrar').post((request,response)=>{
        let categoria={...request.body}
        dbcategoria.delCategoria(categoria).then(result=>{
            response.json(result[0]);
        })
        });  
var port= process.env.port||8090;
app.listen(port);
console.log('Categoria API iniciado en ek puerto: '+ port);
const conexion=require('./conexion');
var Categoria=require('./categoria');
var express=require('express');
var bodyParser= require('body-parser');
var cors = require('cors');
const { request, response } = require('express');
const dbcategoria = require('./dbcategoria');
var app=express();
var router=express.Router();

//Swagger
// https://www.npmjs.com/package/swagger-jsdoc
const swaggerJsdoc= require('swagger-jsdoc');
// https://www.npmjs.com/package/swagger-ui-express
const swaggerUI= require('swagger-ui-express');
/* Ejemplo Swagger https://editor.swagger.io/ */
const swaggerOption={
    swaggerDefinition:{
        info:{
            version:"1.0",
            title:'Api Rest de Categorias',
        description:'Api rest en node js y swagger',
        contact:{
            name:'Brayan Calderon'
        },
        servers:["http://localhost:8090"]
        }
    },
    apis:["api.js"]
};

const swaggerDoc=swaggerJsdoc(swaggerOption);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

// Routes
/**
 * @swagger
 * /api/categoria:
 *  get:
 *      description: Use para obtener todas las categorias
 *      responses:
 *          '200':
 *              description: Listados Correctamente
 */
router.route('/categoria').get((request,response)=>{
dbcategoria.getCategoria().then(result=>{
    response.json(result[0]);
})
});

// Routes
/**
 * @swagger
 * /api/Categoria/{id}:
 *  get:
 *    description: Obtener categoria por ID
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *        '200':
 *          description: Categoria obtenida correctamente
 */
//ruta por id
router.route('/categoria/:id').get((request,response)=>{
    dbcategoria.getCategoriaxid(request.params.id).then(result=>{
        response.json(result[0]);
    })
    });

    /**
 * @swagger
 * /api/categoria/guardar:
 *  post:
 *      description: Use para guardar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                 cat_id: ""
 *                 cat_nom: "Categoria 1"
 *                 cat_obs: "Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria guardada correctamente
 *          content:
 *              application/json:
 *                type: object
 */
    //guardar categoria
    router.route('/categoria/guardar').post((request,response)=>{
        let categoria={...request.body}
        dbcategoria.insertCategoria(categoria).then(result=>{
            response.json(result[0]);
        })
        });   

/**
 * @swagger
 * /api/categoria/modificar:
 *  put:
 *      description: Use para modificar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                cat_id: "1"
 *                cat_nom: "Actualizar Categoria 1"
 *                cat_obs: "Actualizar Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria actualizada correctamente
 *          content:
 *              application/json:
 *                type: object
 */
//modificar categoria
router.route('/categoria/modificar').post((request,response)=>{
    let categoria={...request.body}
    dbcategoria.updateCategoria(categoria).then(result=>{
        response.json(result[0]);
    })
    });  

/**
 * @swagger
 * /api/categoria/borrar:
 *   delete:
 *     description: Borra una categoría existente
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a borrar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoría borrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de borrado
 *                 deletedCategory:
 *                   $ref: '#/components/schemas/categoria'
 *   components:
 *     schemas:
 *       Categoria:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: ID de la categoría
 *           nombre:
 *             type: string
 *             description: Nombre de la categoría
 *           descripcion:
 *             type: string
 *             description: Descripción de la categoría
 */

// Borrar categoria
    router.route('/categoria/borrar').post((request,response)=>{
        let categoria={...request.body}
        dbcategoria.delCategoria(categoria).then(result=>{
            response.json(result[0]);
        })
        });  
var port= process.env.port||8090;
app.listen(port);
console.log('Categoria API iniciado en ek puerto: '+ port);
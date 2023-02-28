var config = require('./conexion');
const sql = require('mssql');
async function getCategoria(){
    try{
let pool= await sql.connect(config);
let categorias=await pool.request().query("SELECT * FROM TM_Categoria");
return categorias.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
async function getCategoriaxid(cat_id){
    try{
        let pool= await sql.connect(config);
        let categorias=await pool.request()
        .input('input_parameter',sql.Int, cat_id)
        .query("SELECT * FROM TM_Categoria where Cat_Id=@input_parameter");
        return categorias.recordsets;
            }
            catch(error){
                console.log(error);
            }
}

async function insertCategoria(categoria){
    try{
        let pool= await sql.connect(config);
        let Insertcat=await pool.request()
        .input('cat_id',sql.Int, categoria.cat_id)
        .input('cat_nombre',sql.VarChar, categoria.cat_nombre)
        .input('cat_obs',sql.VarChar, categoria.cat_obs)
        .execute("SP_I_CAT_01");
        return Insertcat.recordsets;
            }
            catch(error){
                console.log(error);
            }
}

async function updateCategoria(categoria){
    try{
        let pool= await sql.connect(config);
        let Updatecat=await pool.request()
        .input('cat_id',sql.Int, categoria.cat_id)
        .input('cat_nombre',sql.VarChar, categoria.cat_nombre)
        .input('cat_obs',sql.VarChar, categoria.cat_obs)
        .execute("SP_U_CAT_01");
        return Updatecat.recordsets;
            }
            catch(error){
                console.log(error);
            }
}

async function delCategoria(categoria){
    try{
        let pool= await sql.connect(config);
        let delcat=await pool.request()
        .input('cat_id',sql.Int, categoria.cat_id)
        .execute("SP_D_CAT_01");
        return delcat.recordsets;
            }
            catch(error){
                console.log(error);
            }
}


module.exports={
    getCategoria:getCategoria,
    getCategoriaxid:getCategoriaxid,
    insertCategoria:insertCategoria,
    updateCategoria:updateCategoria,
    delCategoria:delCategoria
}
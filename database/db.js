const { Pool } = require('pg') ; 

//require('dotenv').config();

const pool = new Pool({
    host : process.env.POSTGRES_HOST || '127.0.0.1',
    user : process.env.POSTGRES_USER  || 'postgres',
    database : process.env.POSTGRES_DB  || 'postgres',
    password : process.env.POSTGRES_PASSWORD  || 'uadb_secret',
    port :  process.env.POSTGRES_PORT || 5432,
});


pool.connect((err,_,release) =>{
if(err) {
    return console.error('Erreur survenue au niveau du client', err.stack);
}
console.log('Connection à la base de donnée réussie');
release();
});


module.exports = {
    pool,
    query : (text,params) => pool.query(text,params)
}
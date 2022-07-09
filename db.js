const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    password:'0786',
    database: 'books_student_db',
    host: 'localhost',
    port: 5432
});
module.exports =pool;
const mysql = require('mysql2')

const database = mysql.createConnection({
    user: 'root',
    password: '',
    port: 9000,
    database: 'TODO',
    host: '127.0.0.1'
})

database.connect((err) => {
    if(err){
        console.log('ivyko klaida: ', err)
    }else{
        console.log('prisijungta prie DB sekmingai')
    }
})

module.exports = database
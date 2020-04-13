const mysql = require('mysql');

const con = mysql.createConnection({
    host: '198.50.130.238',
    port: 3306,
    user     : 'alek',
    password : 'Cthulhu2209',
    database : 'receita_digital',

});

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})

con.end((err) => {
    if(err) {
        console.log('Erro to finish connection...', err)
        return 
    }
    console.log('The connection was finish...')
})
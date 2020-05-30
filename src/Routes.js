var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '198.50.130.238',
    user: 'alek',
    password: 'Cthulhu2209',
    database: 'receita_digital'
})

connection.connect(function (err) {
    if (err) throw err
    console.log("Connected!")
    const sql = "INSERT INTO receitas (NOME_PACIENTE_RECEITA, CPF_PACIENTE_RECEITA, CARTAO_SUS_PACIENTE, MEDICAMENTO_RECEITA, DOSAGEM, DATA_RECEITA, OBS_RECEITA_PACIENTE) VALUES ('Ribamar', '12245778778', '000000000', 'dipirona', '5406mg', '0000-00-00', 'dasdoasd')"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log("1 record inserted")
    })
})

const medicamentos = connection.query('SELECT NOME_COMERCIAL FROM medicamentos', function (err, result, fields) {
    if (err) throw err
    return result
})



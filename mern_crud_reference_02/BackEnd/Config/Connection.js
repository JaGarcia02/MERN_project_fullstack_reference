//---------DB Connection-----------
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:null,
    database:'test'
});

connection.connect(function(err){
    if(err){
        console.log('Error Data Connection!' + err.stack);
        return;
    }
    console.log('Success Data Connection!');
});




module.exports = connection;
//---------DB Connection-----------
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();


// // Fazendo testes com reduce

// const users =[
//     {
//         name: 'Fernando',
//         age: 50,
//         weight : 170,
//         gender : 'Male',
//         city : 'Marília',
//         sp: "SP" 
//     },
//     {
//         name: 'Lucas',
//         age: 40,
//         weight : 130,
//         gender : 'Male',
//         city : 'Lins',
//         sp: "SP" 
//     },
//     {
//         name: 'Marcelo',
//         age: 30,
//         weight : 125,
//         gender : 'Male',
//         city : 'Lins',
//         sp: "SP" 
//     },
//     {
//         name: 'Douglas',
//         age: 20,
//         weight : 69,
//         gender : 'Male',
//         city : 'Pompéia',
//         sp: "SP" 
//     }
//   ];    
  
// // Exemplo de Reduce
// const totalWeight = users.reduce( (acc, cur) => {
//     return acc + cur.weight
// }, 0);

// console.log("Total Weight:", totalWeight);

// // Exemplo de Reduce
// const totalAge = users.reduce( (acc, cur) => {
//     return acc + cur.age;
// }, 0);

// console.log('Total Age:', totalAge);

const rotaProdutores = require('./routes/producer-route');
const rotaUsuarios = require('./routes/user-route');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));  // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
    console.log('configure Headers')
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'OPTIONS, PUT, POST, PATCH, DELETE, GET');
    next();
});

app.use('/produtors', rotaProdutores);
app.use('/users', rotaUsuarios);

app.use( (req, res, next) =>{
    const erro = new Error('não encontrou a Rota');
    erro.status = 404;
    next(erro);
})

app.use( (error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;
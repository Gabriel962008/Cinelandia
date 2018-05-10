var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Cria Conexão com o Banco 
// Conexão na base de dados tarefas da máquina local (localhost)
mongoose.connect("mongodb://localhost/filmes", { useMongoClient: true });

// Verifica conexão com MongoDB
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'Não foi possível se conectar no MongoDB!'));
dbMongo.once('open', function () {
	console.log('Aplicação conectada no MongoDB');
});

// Vamos criar um modelo baseado em um schema (http://mongoosejs.com/docs/guide.html) do Mongoose
// Tipos podem ser definidos http://mongoosejs.com/docs/schematypes.html
var Filme = mongoose.model('filmes',
	new mongoose.Schema({
        titulo: { type: String, required: [true, 'Título é obrigatório!'] },
        duracao: {type: Number, required:[true, 'Duração é obrigatória']},
        sinopse: {type: String, required: [true, 'Sinopse é obrigatória.']},
        classificacao: {type: String, required:[true, 'Classificaçao é obrigatória.']},
        idioma: {type: String, required: [true, 'Idioma é obrigatório.']}
    }));
    
var Cinema = mongoose.model('cinemas', 
    new mongoose.Schema({
        nome: {type: String, required: [true, 'Nome do cinema é obrigatório']},
        precoSessao: {type: Number, required: [true, 'Valor do ingresso é obrigatório.']},
        horarioSessao: {type: String, required:[true, 'Horário da sessão é obrigatório.']}
}));


var Usuario = mongoose.model('usuarios',
    new mongoose.Schema({
        nome: {type:String, required:[true, 'Nome é obrigatório.']},
        login: {type:String, required:[true, 'Login é obrigatório.']},
        email: {type:String, required:[true, 'E-mail é obrigatório.']},
        senha: {type:String, required:[true, 'Senha é obrigatória.']},
        cpf: {type:String, required:[true, 'CPF é obrigatório.']}
}));

new Filme(
    {
        titulo: 'Teste 1',
        duracao: 120,
        sinopse: 'Sinopse',
        classificacao: '+14',
        idioma: 'Ingles'
    }
).save();
new Filme(
    {
        titulo: 'Teste 2',
        duracao: 120,
        sinopse: 'Sinopse2',
        classificacao: '+16',
        idioma: 'Portugues'
    }
).save();
new Cinema(
    {

    }
).save();


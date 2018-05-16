console.log('funcionou');

var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
/*
// Cria Conexão com o Banco 
// Conexão na base de dados tarefas da máquina local (localhost)
mongoose.connect("mongodb://localhost/bd");

var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'Não foi possível se conectar no MongoDB!'));
dbMongo.once('open', function () {
	console.log('Aplicação conectada no MongoDB');
});
var Filme = mongoose.model('filmes',
	new mongoose.Schema({
        titulo: { type: String, required: [true, 'Título é obrigatório!'] },
        duracao: {type: Number, required:[true, 'Duração é obrigatória']},
        sinopse: {type: String, required: [true, 'Sinopse é obrigatória.']},
        classificacao: {type: String, required:[true, 'Classificaçao é obrigatória.']},
        idioma: {type: String, required: [true, 'Idioma é obrigatório.']},
        imagem: {type: String, required: [true, 'Imagem é obrigatória.']}
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
var myFilme = 
  {
      titulo: 'Teste 1',
      duracao: 120,
      sinopse: 'Sinopse',
      classificacao: '+14',
      idioma: 'Ingles',
      imagem: '/images/venom.jpg'
  }

new Filme(myFilme).save((err, objFilmeLocal) => {
  if(err)
  {
    console.error(err);
    res.status(500).send('Erro na aplicação: ' + err.message);
  }
  else{
    console.log('Filme Adicionado ...');
  }
});
*/


mongoose.connect("mongodb://localhost/cinelandia");
var dbMongo = mongoose.connection;

dbMongo.on('error', console.error.bind(console, 'Não foi possível se conectar no MongoDB!'));
dbMongo.once('open', function () {
	console.log('Aplicação conectada no MongoDB');
});


var Filme = mongoose.model('filmes',
	new mongoose.Schema({
        nome: { type: String, required: [true, 'Nome é obrigatório!'] },
        ano: {type: Number, required:[true, 'ano é obrigatória']},
        preco: {type: Number, required: [true, 'preço é obrigatória.']},
        descricao: {type: String, required:[true, 'descrição é obrigatória.']},
        horario: {type: Array, required: [true, 'Horarios é obrigatório.']},
        //imagem: {type: String, required: [true, 'Imagem é obrigatória.']}
    }));


var filmes = [{nome:'venom',ano:2018,descricao:'filme da marvel',img:'images/venom.jpg'},
              {nome:'deadpool 2',ano:2018,descricao:'filme da marvel',img:'images/deadpool.jpg'},
              {nome:'Jogador numero 1',ano:2018,descricao:'filme de suspense e ficção científica',img:'images/jogador1.jpg'}];

var filme = {nome:'venom',ano:2018,descricao:'filme da marvel',img:'../public/images/venom.jpg'};


app.set('view engine','ejs');
app.use( express.static('views') ); //app.use( express.static( "public" ) );

app.get('/',function(req,res){

  Filme.find({},function(err,filmes){
      if (err) {
        console.error(err);
        res.status(500).send('Erro na aplicação: ' + err.message);
      } else {
			  res.render('home', {
				filmes: filmes,
			})
		}
  });

   //res.render('home',{filmes});//esse aqui serve para renderizar uma view
   //res.send('Home');
})

app.get('/filmes',function(req,res){
   res.render('filmes',{filme});//esse aqui serve para renderizar uma view
   //res.send('Página filmes');
})

app.get('/pagamento',function(req,res){
   res.render('pagamento');//esse aqui serve para renderizar uma view
   //res.send('Página para finalizar a compra');
})

app.use(function(req,res,next){
   res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

app.listen(3000,function(){
	console.log('servidor rodando na porta 3000.');
});

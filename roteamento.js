console.log('funcionou');

var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect("mongodb://gm.trabalho:gm$webdev123@ds123500.mlab.com:23500/cinelandia");
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

/*
    Modelo para criar filmes manualmente
*/
new Filme(
  {
   'nome': 'teste filme',
   'ano' : 2000,
   'preco' : 15,
   'descricao' : 'teste descricao',
   'horario' : [
     {
       'hora' : '15:00',
       'poltronas' : [
            {'pos':1, 'status': false},
            {'pos':2, 'status': false},
            {'pos':3, 'status': false}
       ]
     }
   ]
  }).save((err, objTarefaLocal) => 
{
  if (err) {
    console.error(err);
  } else {
    console.log('Tarefa Adicionada ...');
    }
});

app.set('view engine','ejs');
app.use( express.static('views') ); 
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

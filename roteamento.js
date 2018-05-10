console.log('funcionou');

var http = require('http');
var express = require('express');
var app = express();



var filmes = [{nome:'venom',ano:2018,descricao:'filme da marvel',img:'images/venom.jpg'},
              {nome:'deadpool 2',ano:2018,descricao:'filme da marvel',img:'images/deadpool.jpg'},
              {nome:'Jogador numero 1',ano:2018,descricao:'filme de suspense e ficção científica',img:'images/jogador1.jpg'}];

var filme = {nome:'venom',ano:2018,descricao:'filme da marvel',img:'../public/images/venom.jpg'};

app.set('view engine','ejs');
app.use( express.static( "public" ) );

app.get('/',function(req,res){
   res.render('home',{filmes});//esse aqui serve para renderizar uma view
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
	console.log('servido rodando');
});

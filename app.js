const http = require('http');
const queryString = require ('query-string');
const url = require ('url');
const fs = require ('fs'); 

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var resposta;

    const urlparse = url.parse(req.url, true );
    const params = queryString.parse(urlparse.search);
    if(urlparse.pathname == '/criar-atualizar-usuario' ){
        
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            console.log('Usuário Salvo!');

            resposta = 'Usuario criado/atualizado com sucesso';

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
        });
    }
    else if (urlparse.pathname == '/selecionar-usuario') {
        fs.readFile('users/' + params.id + '.txt', function(err, data){
            resposta = data;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(resposta);
        });
    }
    
    else if (urlparse.pathname == '/remover-usuario') {
        fs.unlink('users/' + params.id + '.txt', function (err) {
            console.log('File deleted!');

            resposta = err ? "Usuario nao encontrado." : "Usuario removido!";

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
          });
}
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
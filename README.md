# Locadora
Locadora de Filmes REST desenvolvida em NodeJS, Express e Sequelize 
######
A Documentação do ORM Sequelize encontra-se em: http://docs.sequelizejs.com

### Instalação
####Criar tabelas do banco
As tabelas do banco de dados serão automaticamente criadas pelo Sequelize.sync() que fica no server.js da
aplicação.

####Instalar dependecias
```
npm install
```
Editar as configurações de conexão do banco na pasta config/config.json
e na pasta environment no environment.dev
E depois executar:

```$xslt
cd src
../node_modules/.bin/sequelize db:create
```

Depois executar
```$xslt
npm live-dev
```
######Caso aconteça um erro referente a lib bcrypt basta executar:
```
npm install bcrypt --save
```
###### E executar novamente o comando npm live-dev

##### Popular o Banco (Seed)
```$xslt
../node_modules/.bin/sequelize db:seed:all
```

##Ferramentas da API
Obs*: Qualquer duvida, encontra-se na raiz do projeto um arquivo exportado do postman para testes.
#####Criando uma Conta
Entrada: 
```$xslt
request.post({{url}}/login/new_account).send(
    {"user": {
    	"first_name": "Usuario",
    	"last_name": "Cliente"
    	},
     "login": {
     	"email": "usuario@locadora.com",
     	"password": "user"
     }		
    });
```
Saída: 
```$xslt
{
    "success": true,
    "message": "new User created with success",
    "user": {
        "createdAt": {
            "val": "CURRENT_TIMESTAMP"
        },
        "updatedAt": {
            "val": "CURRENT_TIMESTAMP"
        },
        "id": 2,
        "first_name": "Usuario",
        "last_name": "Cliente",
        "accessGroupId": 2,
        "profile": null,
        "canSignin": true
    }
}
```

#####Login 
Entrada: 
```$xslt
request.post({{url}}/login/signin).send(
    { "email": "usuario@locadora.com",
        "password": "user"
    });
```
Saída: 
```$xslt
{
    "success": true,
    "user": {
        "id": 2,
        "first_name": "Usuario",
        "last_name": "Cliente",
        "profile": null,
        "canSignin": true,
        "createdAt": "2018-06-23T22:04:27.000Z",
        "updatedAt": "2018-06-23T22:04:27.000Z",
        "accessGroupId": 2
    }
}
Header: 
Access-Control-Allow-Origin →*
Access-Control-Expose-Headers →X-Access-Token
Connection →keep-alive
Content-Length →205
Content-Type →application/json; charset=utf-8
Date →Sat, 23 Jun 2018 20:05:36 GMT
ETag →W/"cd-0pw+IDTgQGvYpod9LgI1jQ1N4oI"
X-Access-Token →eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6IlVzdWFyaW8iLCJsYXN0X25hbWUiOiJDbGllbnRlIiwiaWF0IjoxNTI5Nzg0MzM2fQ.N9ouYKQ60AOEj-1UIZbfYNlk9XzhsW7m1-4Q9jevl1Y
```
#####LogOff 
Esta API utiliza autenticação JWT e não possui blacklist, logo o logoff ou a invalidação do token deve 
ser realizado pelo front-end

#####Listando todos os Filmes
Entrada: 
```$xslt
request.header({"x-access-token": token })
    .get({{url}}/filme/get_all)
    .send();
```
Saída: 
```$xslt
{
    "success": true,
    "filmes": [
        {
            "id": 1,
            "titulo": "Senhor dos Anéis",
            "diretor": "Peter Jackson",
            "locado": false,
            "createdAt": "2018-06-23T18:34:26.000Z",
            "updatedAt": "2018-06-23T18:34:26.000Z",
            "filmeId": null,
            "userId": null,
            "filmes": []
        }
    ]
}
```
#####Buscando um filme pelo Titulo
Entrada: 
```$xslt
request.header({"x-access-token": token })
    .get({{url}}/filme/search?titulo=senhor)
    .send();
```
Saída: 
```$xslt
{
    "success": true,
    "filmes": [
        {
            "id": 1,
            "titulo": "Senhor dos Anéis",
            "diretor": "Peter Jackson",
            "locado": true,
            "createdAt": "2018-06-23T18:34:26.000Z",
            "updatedAt": "2018-06-24T00:18:37.000Z",
            "filmeId": null,
            "userId": 2
        }
    ]
}
```

#####Alugando um Filme
Entrada: 
```$xslt
request.header({"x-access-token": token })
    .post({{url}}/filme/rent?filmeId=1)
    .send();
```
Saída: 
```$xslt
{
    "success": true,
    "result": {
        "id": 2,
        "first_name": "Usuario",
        "last_name": "Cliente",
        "profile": null,
        "canSignin": true,
        "createdAt": "2018-06-23T22:04:27.000Z",
        "updatedAt": "2018-06-23T22:04:27.000Z",
        "accessGroupId": 2
    },
    "message": "Filme Locado com sucesso"
}
```

#####Devolvendo um filme
Entrada: 
```$xslt
request.header({"x-access-token": token })
    .post({{url}}/filme/return?filmeId=1)
    .send();;
```
Saída: 
```$xslt
{
    "success": true,
    "message": "Filme devolvido com sucesso"
}
```
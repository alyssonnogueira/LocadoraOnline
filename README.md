# Locadora
Locadora de Filmes REST desenvolvida em NodeJS, Express e Sequelize

### Instalação
####Criar tabelas do banco
Instalar dependecias
```
npm install
```
Editar as configurações de conexão do banco na pasta config/config.json
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

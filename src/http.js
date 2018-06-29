const express = require('express');
const config = require('./environments');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('Access-Control-Expose-Headers', 'X-Access-Token');
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/functions', require('./routes/function'));
app.use('/access_group', require('./routes/access_group'));
app.use('/filme', require('./routes/filme'));

app.listen(config.http.port, () =>
    console.log(`Servidor rodando na porta ${config.http.port}`)
);
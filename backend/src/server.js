const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./api/routes/index.js');

const app = express();
const port = 4000;

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(routes);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).send('Something broke!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

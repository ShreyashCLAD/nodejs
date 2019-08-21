const fs = require('fs'); 
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = 3000;
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: true});
const filepath = './userData.txt'

let resData = [];

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('form');

});

app.post('/', urlencodedParser, (req, res) => {
  const body = req.body;
  if(!body.name) {
    return res.status(400).send('name not specified');
  }
  fs.appendFile(filepath, body.name+'\n', (err) => {
    if(err) res.status(400).send(err);
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`)
})
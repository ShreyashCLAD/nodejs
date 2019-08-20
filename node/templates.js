const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const quotes = require('./quotes');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

function getRandom()
{
const pageSize=10;
const datasize=quotes.length;
let data=[];

for(let i=0;i<pageSize;i++)
{
   const random=Math.floor(Math.random() * datasize);
   if()
   data.push(quotes[random]);
}
return data;

}


app.get('/', (req, res) =>
  res.render('index', {
    title: 'Quotes Generator',
    quotes : getRandom(),
  })
);

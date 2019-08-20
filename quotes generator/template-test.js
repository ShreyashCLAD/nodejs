const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const members = require('./Members');
var fs = require('fs');
const router = express.Router();

router.get('/',(req,res)=>{res.json(members)});

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.get('/',  function (req, res) {
//   res.render('', {qs: req.query})
// })



app.get('/', (request, res) =>
 res.render('', {
   title: 'Member App',
   members
 })
);


// POST /login gets urlencoded bodies
// router.post('/', urlencodedParser, function (req, res) {
//   console.log(req.body);

//   //...
//   // res.end()
//   // console.log(req.body);
//   res.render('index.handlebars',{data : req.body})
// })

app.post('/',urlencodedParser,(req,res)=>{
    
  const newMember = {
  
  name:req.body.name,
  email:req.body.email,
  
} 
if(!newMember.name || !newMember.email){
  return res.status(400).json({msg:"Please Include a name and email"});
}
members.push(newMember);
res.redirect("/");
});
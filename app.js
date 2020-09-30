var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Customer = require("./Customers");
var bodyParser = require("body-parser");
var cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  info: {
    title: 'Example Swagger API',
    version: '1.0.0',
    description: 'This is the Example API documentation and is using the OpenAPI spec.',
  },
  host: `localhost:5000`,
  basePath: '/',
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  apis: ['app.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




var jsonParser = bodyParser.json();
app.use(cors())



mongoose
  .connect(
    "mongodb+srv://Shreyash:Fire%2312345@cluster0.uwc0s.mongodb.net/nodeData?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.warn("connected");
  })
  .catch((err) => console.warn("error", err));
//app.listen(4200);



// Customer.find({},function(err,res){
 //     //console.log(Customer.schema,'here')
//     console.warn(res,'heredata.....')
// })

//Get Api :///
app.get("/customer", function (req, res) {
  Customer.find().then((data) => {
    res.json(data);
  });
});

/**
 * @swagger
 *
 * /customer:
 *   get:
 *     description: get Customers Data
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: getData
 */

app.post("/customer", jsonParser, function (req, res) {
  const data = new Customer({
    _id: new mongoose.Types.ObjectId(),
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Date: req.body.Date,
    Email: req.body.Email,
    MobileNo: req.body.MobileNo,
    Address: req.body.Address,
    City: req.body.City,
    State: req.body.State,
    Pin: req.body.Pin,
    Country: req.body.Country,
  });
  console.log(req.body, "heredats");

  Customer.findOne({Email:req.body.Email}).then((result)=>{
    console.log(result,'HereResult')
    if(result==null){
  data.save()
    .then((result) => {
      console.log(data, "hherePostData");
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, "hereError");
    });
    }
else{
    res.send('user Already Exists')
}

}).catch((err)=>{
    console.log(err,'deleteERR')
})
})


/**
 * @swagger
 *
 * /customer:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: FirstName
 *         description: User first.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */

app.put("/customer/:CId", jsonParser, function (req, res) {
  console.log(req.params.CId, "HereCID....");
  Customer.updateOne(
    { _id: req.params.CId },
    {
      $set: {
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Date: req.body.Date,
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Address: req.body.Address,
        City: req.body.City,
        State: req.body.State,
        Pin: req.body.Pin,
        Country: req.body.Country,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
      console.log(result, "hereUpdate..");
    })
    .catch((err) => console.log(err, "hereError"));
});

app.delete("/customer/:CId", function (req, res) {
  Customer.deleteOne({ _id: req.params.CId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, "deleteError");
    });
});

app.get('/customer/:CId',function(req,res){
    Customer.findOne({_id:req.params.CId}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        console.log(err,'deleteERR')
    })
})

app.listen(5000)
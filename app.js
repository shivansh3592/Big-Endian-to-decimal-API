const express = require("express");
const app= express();
const bodyParser = require('body-parser')

const convert = require('./js/endianToDecimal.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//POST ROUTES
app.post('/',(req, res)=>{
     // let value = req.body ;
     let sendData= convert.endianTODecimal(req.body);
    res.send(sendData);
})

//GET ROUTES
app.get("/",(req, res)=>{
    res.render("index");
});




//SIMPLE ERROR HANDLING
app.use((req, res,next)=> {
    const error = new Error('Not Found') ;
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(err.status || 500) ;
    res.json({
        error: {
            message : error.message
        }
    })
})




app.listen(process.env.PORT || 8080, process.env.ID, function() {

    console.log("API started");
});

var express=require('express');
var app=express();

app.set('view-engine','ejs'); //Setting the view engine to show the template.
app.use(express.static(__dirname + '/assets'));

app.get("/",(req,res)=>{
    res.send('Hello World');
});

app.get("/login",(req,res)=>{
     res.render("login.ejs"); 
})

app.listen(3000);
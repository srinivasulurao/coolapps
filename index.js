var express=require('express');
var app=express();
var bodyParser=require('body-parser');
const UserAuth=require("./models/UserAuth");
const FreeApps = require('./models/FreeApp');
var sessionStorage=require("sessionstorage"); 
const PORT = process.env.PORT || 5000

app.set('view engine','ejs'); //Setting the view engine to show the template.
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended: true})); //Body parser for 

app.get("/",(req,res)=>{
    res.render("home.ejs"); 
});

app.get("/login",(req,res)=>{
     let logged_in=(sessionStorage.getItem('user_id'))?true:false; // We need to get the freshvalue of session storage everytime the page loads.
     res.render("login",{message:false,logged_in:logged_in}); 
});

app.post("/do-login",(req,res)=>{
        let logged_in=(sessionStorage.getItem('user_id'))?true:false;
        let authenticate=new UserAuth();
        let result=authenticate.checkCredentials(req.body.email_addr,req.body.user_pass);
        result.then(data=>{
            if(data==1){
                //redirect to profile page.
                return res.redirect("/profile");
            }
        }).catch(err=>{  
            res.render('login',{ message:err,logged_in:logged_in });
        }); 
});

app.get("/profile",(req,res)=>{
    //Show something in this page.
    let logged_in=(sessionStorage.getItem('user_id'))?true:false;
    let freeapps=new FreeApps();
    res.render("profile.ejs",{"free_apps":freeapps.listAllApps(),logged_in:logged_in});
}); 

app.get("/random-dog-image",async (req,res)=>{
    let logged_in=(sessionStorage.getItem('user_id'))?true:false;
    let freeapps=new FreeApps();
    let rdi=await freeapps.getRandomDogImage();
    res.render("random-dog-image.ejs",{"api_response":rdi,logged_in:logged_in}); 
});

app.get("/nasa-mars",async (req,res)=>{
    let logged_in=(sessionStorage.getItem('user_id'))?true:false;
    let freeapps=new FreeApps();
    let current_page=(isNaN(req.query.page))?1:parseInt(req.query.page);
    let mars=await freeapps.getMarsImages(current_page);
    let prev_page_no=(current_page>1)?(current_page-1):1;
    let next_page_no=current_page+1;
    res.render("mars-images.ejs",{"api_response":mars.photos,"prev_page_no":prev_page_no,"next_page_no":next_page_no,logged_in:logged_in}); 
});

app.get("/jokes",async (req,res)=>{
    let logged_in=(sessionStorage.getItem('user_id'))?true:false;
    let freeapps=new FreeApps();
    let jokes=await freeapps.getJokes();
    res.render("jokes.ejs",{"api_response":jokes,logged_in:logged_in}); 
});

app.get("/logout",(req,res)=>{
   sessionStorage.clear();
   return res.redirect("/login");
});

app.listen(PORT);
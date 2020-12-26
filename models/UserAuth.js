var mysql=require('mysql');
var db_config=require("../config/db");
var md5=require('md5');
var sessionStorage=require("sessionstorage"); 
class UserAuth{

    constructor(){

    }

    sayHi(){
      return "hi";
    }

    checkCredentials(email,password){

      let con=mysql.createConnection({
          host:db_config.hostname,
          user:db_config.username,
          password:db_config.password,
          database:db_config.database
      });
      con.connect(); 

      let md5_pass=md5(password);
      let sql="SELECT * FROM users WHERE email='"+email+"' AND password='"+md5_pass+"'";
      let user_result=new Promise(async (resolve, reject)=>{
        let mysql_query=await con.query(sql, function(err,result, fields){
            if(err){
              reject(err);
            }
            else{
              if(result.length){
                //Store the values to the session storage.
                sessionStorage.setItem('email',result[0].email);
                sessionStorage.setItem('user_id',result[0].user_id);
                sessionStorage.setItem('password',"Fuck off");
                sessionStorage.setItem('enabled',result[0].enabled);
               resolve(1);
              }
              else{
                reject("Invalid Credentials !"); 
              }
            }
        });
      });

      return user_result;
    }

}

module.exports=UserAuth;
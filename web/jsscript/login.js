/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userid,password;
function connectUser()
{
    userid=$("#username").val();
    password=$("#password").val();
    if(validate()===false)
    {
     swal("Access Denied ","please enter userid/pasword!","error");
     return;
     
            
    }
    
    var data={
        userid:userid,
        password:password
        
    };
    $.post("LoginControllerServlet",data,processresponse);
    
}
function processresponse(responseText) {
    responseText=responseText.trim();
    if(responseText==="error") {
       
        swal("Access Denied","please enter valid userid/passwrod","error");
        
    }
    else if(responseText.indexOf("jsessionid")!==-1) {
        swal("Success","Login Accepted","success");
        setTimeout(function(){
            window.location=responseText;
        },3000);
        

    }
    else {
        swal("AcessDenied","Some problem occured please try again later","error");
        
    }
}
function validate(){
    if(userid ==="" || password==="") {
     
       // swal("Error!","All fields are mandatory!","error");
        return false;
    }
    else {
        return true;
    }
}



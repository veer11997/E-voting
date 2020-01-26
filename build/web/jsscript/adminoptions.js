function redirectadministratorpage(){
    swal('Admin!',"Redirect to Admin Page!","success");
    setTimeout(function(){window.location="adminactions.jsp";},3000);
}
function managecandidate(){
    swal('Admin!',"Redirect to Candidate Management Page!","success");
    setTimeout(function(){window.location="managecandidate.jsp";},3000);
}
function redirectvotingpage(){
    swal('Admin!',"Redirect to voting!","success");
    setTimeout(function(){window.location="VotingControllerServlet";},3000);
}

function manageuser()
{
    swal('Admin!',"Redirect to User Management Page!","success");
    setTimeout(function(){window.location="manageuser.jsp";},3000);
}

function showuser()
{
     removecandidateForm();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML="<h3>Show User</h3>";
  //  newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div><div><select id='cid'>\n\</select></div>";
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
  //  var addPrd=$("#result")[0];
   // addPrd.appendChild(newdiv);
  data={data:"uid"};
    
    $.post("ShowUserControllerServlet",data,function(responseText){
       // $('#cid').append(responseText);
         //$("#result").append(responseText);
         
        $("#result").html(" ");
  
      $("#result").html(responseText);

        
    });
    
    
}

function removeuser()
{
     removecandidateForm();
     $("#result").html(" ");
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML="<h3>Remove User</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>User Id:</div><div><select id='uid'>\n\</select></div>";
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addPrd=$("#result")[0];
    addPrd.appendChild(newdiv);
    data={data:"uid"};
    
    $.post("RemoveUserControllerServlet",data,function(responseText){
        $('#uid').append(responseText);
        
    });
    
    $("#uid").on('click',function(){
        var uid=$(this).children("option:selected").val();
        data={data:uid};
        $.post("RemoveUserControllerServlet",data,function(responseText){
            clearText();
         $("#addresp").append(responseText);
        });
    });   

    
}

function addcandidate()
{
    var data= new FormData(document.getElementById("fileUploadForm"));
   // var form=$('#fileUploadForm');
   // var data=new FormData(form);
   var pic=$('#image').val();
    var cid=$('#cid').val();
    var cname=$('#cname').val();
    var city=$('#city').val();
    var party=$('#party').val();
    var uid=$('#uid').val();
    data.append('image',pic);
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("city",city);
    data.append("party",party);
   
    $.ajax({
        type:"POST",
        enctype:"multipart/form-data",
        url:"AddNewCandidateControllerServlet",
        data:data,
        processData:false,
        contentType:false,
        cache:false,
        timeout:600000,
        success:function(data){
            
            str=data+"....";
            swal("Admin!",str,"success");
            setTimeout(function(){showaddcandidateform();},3000);
        },
        error:function(e){
            swal("Admin",e,"error");
        }
    });
    
}
function removecandidateForm()
{
    var contdiv=document.getElementById("result");
    var formdiv=document.getElementById("candidateform");
    if(formdiv!==null)
    {
        $("#candidateform").fadeOut("3500");
        contdiv.removeChild(formdiv);
        
    }
}
function showaddcandidateform() {
   removecandidateForm();
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","127px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML="<h3>Add New Candidate</h3>";
    newdiv.innerHTML=newdiv.innerHTML +"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
    <table><tr><th>Candidate Id:</th><td><input type='text' id='cid'></td></tr>\n\
    <tr><th>User Id:</th><td><input type='text' id='uid' onkeypress='return getdetails(event)'></td></tr>\n\
    <tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
    <tr><th>City:</th><td><select id='city'></select></td></tr>\n\
    <tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
    <tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
    <tr><th><input type='button' value='Add Candidate' onclick='addcandidate()' id='addcnd'></th>\n\
    <th><input type='reset' value='Clear' onclick='ClearText()'></th></tr></table></form>";
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addcand=$("#result");
    addcand.append(newdiv);
    data={id:"getid"};
    $.post("AddCandidateControllerServlet",data,function(responseText){$("#cid").val(responseText);
    $('#cid').prop("disabled",true)});
}
function getdetails(e) {
    if(e.keyCode === 13) {
        data={uid:$("#uid").val()};
        $.post("AddCandidateControllerServlet",data,function(responseText){  
            responseText=responseText.trim();
            var i=responseText.lastIndexOf(",");
            $('#city').empty();
            $('#city').append(responseText.substring(0,i));
            var uname=responseText.substring(i+1,responseText.length);
            if(uname==="wrong")
                swal("Wrong Adhar!","Adhar no not found in DB","error");
            else {
                $('#cname').val(uname);
                $('#cname').prop("disabled",true);
            }
        });
    }
}

function clearText()
{
    $("#addresp").html("");
    
}


function showresult()
{
 
    $("#result").html("");
    $("#result").html(responseText);
    
}

function deletecandidate()
{
    removecandidateForm();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML="<h3>Delete Candidate</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div><div><select id='cid'>\n\</select></div>";
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addPrd=$("#result")[0];
    addPrd.appendChild(newdiv);
    data={data:"cid"};
    
    $.post("DeleteCandidateControllerServlet",data,function(responseText){
        $('#cid').append(responseText);
        
    });
    
    $("#cid").on('click',function(){
        var cid=$(this).children("option:selected").val();
        data={data:cid};
        $.post("DeleteCandidateControllerServlet",data,function(responseText){
            clearText();
         $("#addresp").append(responseText);
        });
    });   
}




function showcandidate()
{
    removecandidateForm();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML="<h3>Show Candidate</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div><div><select id='cid'>\n\</select></div>";
   
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addPrd=$("#result")[0];
    addPrd.appendChild(newdiv);
    data={data:"cid"};
    
    $.post("ShowCandidateControllerServlet",data,function(responseText){
        $('#cid').append(responseText);
        
    });
    
    $("#cid").on('change',function(){
        var cid=$(this).children("option:selected").val();
        data={data:cid};
        $.post("ShowCandidateControllerServlet",data,function(responseText){
            clearText();
            $("#addresp").append(responseText);
        });
    });
   
}


function electionresult()
{
   
 var data={data:"result"};
 
   $.post("ElectionResultControllerServlet",data,function(responseText)
   {
       
  //  swal("success",responseText.trim(),"success");
  swal("success","Election Result...","success");
    
    
        $("#result").html(" ");
  
      $("#result").html(responseText);

});

}
    
  

function showupdatecandidateform()
{
   removecandidateForm();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML="<h3>Update  Candidate</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div><div><select id='cid'>\n\</select></div>";
 /*   newdiv.innerHTML=newdiv.innerHTML +"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
    <table><tr><th>Candidate Id:</th><td><select  id='cid'></select></td></tr>\n\
    <tr><th>User Id:</th><td><input type='text' id='uid' ></td></tr>\n\
    <tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
    <tr><th>City:</th><td><input type='text' id='city'></td></tr>\n\
    <tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
    <tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
    <tr><th><input type='button' value='Add Candidate' onclick='addcandidate()' id='addcnd'></th>\n\
    <th><input type='reset' value='Clear' onclick='ClearText()'></th></tr></table></form>";*/
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addPrd=$("#result")[0];
    addPrd.appendChild(newdiv);
    data={data:"cid"};
   
    $.post("UpdateCandidateControllerServlet",data,function(responseText){
           responseText=responseText.trim();
            var i=responseText.lastIndexOf(",");
            $('#cid').empty();
            $('#cid').append(responseText.substring(0,i));
    });
    
    $('#cid').on('click',function(){
        var cid=$(this).children("option:selected").val();
        data={data:cid};
        $.post("UpdateCandidateControllerServlet",data,function(responseText){
             clearText();
            $("#addresp").append(responseText);
            $('#uid').prop("disabled",true);
              $('#cname').prop("disabled",true);
        });  
    });   
}



function updatecandidate()
{
    var data= new FormData(document.getElementById("fileUploadForm"));
   // var form=$('#fileUploadForm');
   // var data=new FormData(form);
    var cid=$('#cid').val();
    var cname=$('#cname').val();
    var city=$('#city').val();
    var party=$('#party').val();
    var uid=$('#uid').val();
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("city",city);
    data.append("party",party);
   
    $.ajax({
        type:"POST",
        enctype:"multipart/form-data",
        url:"AddUpdateCandidateControllerServlet",
        data:data,
        processData:false,
        contentType:false,
        cache:false,
        timeout:600000,
        success:function(data){
            
            str=data+"....";
            swal("Admin!",str,"success");
            setTimeout(function(){showupdatecandidateform();},3000);
        },
        error:function(e){
            swal("Admin",e,"error");
        }
    });
    
}
 
 
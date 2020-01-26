<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="evoting.dto.CandidateDetails"%>
<%@page import="java.util.ArrayList" %>
<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        response.sendRedirect("accessdenied.html");
        return;
    }
    String result=(String)request.getAttribute("result");
    StringBuffer displayBlock=new StringBuffer("");
    if(result.equals("candidateList"))
    {
        ArrayList<String> candidateId=(ArrayList)request.getAttribute("candidateId");
        for(String c:candidateId)
        {
            displayBlock.append("<option value='"+c+"'>"+c+"</option>");
          
        }
        displayBlock.append("'");
        out.println(displayBlock+",");  
    }
    else if(result.equals("details"))
            {  
                CandidateDetails candidate=(CandidateDetails)request.getAttribute("candidate");
                System.out.println("show update candidate"+candidate.getUserId());
             
                displayBlock.append("'<table>"
                  +"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>"
                  +"<tr><th>Candidate Id:</th><td>"+"<input type='text' id='cid' value='"+candidate.getCandidateId()+"'>"+"</td></tr>"
                  +"<tr><th>User Id:</th><td>"+"<input type='text' id='uid' value='"+candidate.getUserId()+"'>"+"</td></tr>"
                  +"<tr><th>Candidate Name:</th><td>"+"<input type='text' id='cname' value='"+candidate.getCandidateName()+"'>"+"</td></tr>"
                  +"<tr><th>City:</th><td>"+"<input type='text' id='city' value='"+candidate.getCity()+"'>"+"</td></tr>"
                 
                  +"<tr><th>Party:</th><td>"+"<input type='text' id='party' value='"+candidate.getParty()+"'>"+"</td></tr>"
                //  +"<tr><td colspan='2'>"+"<input type='file' name='files' value='Select Image'></td></tr>"
                  +"<tr><th>Symbol:</th><td id='image'>"
              
                        +"<input type='file' name='files' value='Select Image'></td></tr>"     
                  + "<tr><th>"+"<input type='reset' value='Clear' onclick='ClearText()'></th></tr>+"
                  + "<tr><th>"+"<input type='button' value='Update Candidate' onclick='updatecandidate()' id='addcnd' >"      
                  +"</form>"
                  +"</table>'");
                
               
                
                out.println(displayBlock);
               
            }
    
    %>
                
    

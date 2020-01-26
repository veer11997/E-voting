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
    if(result.equals("userList"))
    {
        ArrayList<String> userId=(ArrayList)request.getAttribute("userId");
        for(String c:userId)
        {
            displayBlock.append("<option value='"+c+"'>"+c+"</option>");
        }
        out.println(displayBlock);
    }
    else if(result.equals("details"))
            {
                
                //CandidateDetails candidate=(CandidateDetails)request.getAttribute("candidate");
          /*      displayBlock.append("'<table>"

                            +"<tr><th>User Id:</th><td>"+candidate.getUserId()+"</td></tr>"
                            +"<tr><th>Candidate Name :</th><td>"+candidate.getCandidateName()
                            +"</td></tr>" 
                            +"<tr><th>City:</th><td>"+candidate.getCity()+"</td></tr>"
                            +"<tr><th>Party:</th><td>"+candidate.getParty()+"</td></tr>"
                            +"<tr><th>Symbol:</th><td id='image'>"
                        +"<img src='data:image/jpg;base64,"+candidate.getSymbol()
                        +"'style='width:300px;height:200px;'/></td></tr>"
                        +"</table>'");
                       */
                displayBlock.append("<h1>User Deleted</h1>");
                out.println(displayBlock);
               
            }
    
    %>
                
    

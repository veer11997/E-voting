<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="evoting.dto.UserDetails"%>
<%@page import="java.util.ArrayList" %>
<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        response.sendRedirect("accessdenied.html");
        return;
    }
    String result=(String)request.getAttribute("result");
    StringBuffer displayBlock=new StringBuffer("<table>");
    if(result.equals("details"))
     {
        displayBlock.append("<tr><th>User Name</th><th>UserId</th><th>Email    </th><th>Address     </th><th>Mobile Number</th><th>City</th></tr>");
        ArrayList<UserDetails> user=(ArrayList)request.getAttribute("user");
        //UserDetails u=(UserDetails)request.getAttribute("user");
        
              System.out.println("out of user");
    for(UserDetails u:user)
    {
     System.out.println("inside of user");
     displayBlock.append("<tr><td>"+u.getUsername()+"</td><td>"+u.getUserid()+"</td><td>"+u.getEmail()+"</td><td>"+u.getAddress()+"</td><td>"+u.getMobile()+"</td><td>"+u.getCity()+"</td></tr>");
    }
    displayBlock.append("</table>");
        displayBlock.append(" ........................................................................");
    out.println(displayBlock);
               
        }
    
    %>
                
    
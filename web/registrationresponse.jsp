<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    boolean result=(Boolean)request.getAttribute("result");
    boolean userfound=(Boolean)request.getAttribute("userfound");
   
    if(userfound==true)
    {
        
        out.println("uap");
        
    }
    else if(result==true)
    {
        out.println("success");
        
    }
    else
    {
        out.println("error");
    }
    %>
    
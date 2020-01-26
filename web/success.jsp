<%@page contentType="text/html" pageEncoding="UTF-8"%>
  <%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        response.sendRedirect("accessdenied.html");
        return;
    }
    out.println("success");
%>

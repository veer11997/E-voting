<%-- 
    Document   : showexception
    Created on : 20 Dec, 2019, 8:34:58 PM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link href="stylesheet/backgroundimage.css" rel="stylesheet">
         <link href="stylesheet/pageheader.css" rel="stylesheet">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Show Exception Page</title>
    </head>
    <body>
        <br>
        <div class="candidate">
            Vote For Change..
        </div>
        <br>
        <div class="subcandidate">
            Please Try Again later
        </div>
        
        <%
            Exception ex=(Exception)request.getAttribute("exception");
            System.out.println(ex);
            out.println(ex);
            
            %>
    </body>
</html>

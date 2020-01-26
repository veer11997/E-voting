/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package evoting.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.swing.JOptionPane;

/**
 *
 * @author hp
 */
public class DBConnection {
    
    private static Connection conn;
    static{
        try{
            Class.forName("oracle.jdbc.OracleDriver");
            conn=DriverManager.getConnection("jdbc:oracle:thin:@//LAPTOP-L0CLMK94:1521/xe","evoting","abc");
            System.out.println("Connection opened");
            }
            catch(Exception e)
        {
 
              e.printStackTrace();
        }
           
    }

    public static  Connection getConnection()
    {
        return conn;
    }
    public static void closeConnection()
    {
     try{   
         conn.close();
         System.out.println("Connection Closed");
     
     }
     catch(SQLException e)
     {
        e.printStackTrace();
     }
    }
    

    
}

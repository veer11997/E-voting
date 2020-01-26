/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.CandidateDto;
import evoting.dto.UserDTO;
import evoting.dto.UserDetails;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;

/**
 *
 * @author hp
 */
public class UserDAO {
    private static Statement st3;
    private static PreparedStatement ps,ps1,ps3,ps4;
    static{
        
     try{   
          st3=DBConnection.getConnection().createStatement();
         ps=DBConnection.getConnection().prepareStatement("select * from user_details where adhar_no=? and password=?");
         ps1=DBConnection.getConnection().prepareStatement("select candidate_id , username , party , symbol from candidate , user_details where candidate.user_id=user_details.adhar_no and candidate.city =(select city from user_details where adhar_no=?)");
         ps3=DBConnection.getConnection().prepareStatement("select username, adhar_no, email, address,  mobile_no, city , password from user_details");
           ps4=DBConnection.getConnection().prepareStatement("DELETE FROM user_details WHERE ADHAR_NO=?");
         
     }
     catch(SQLException ex)
     {
         if(DBConnection.getConnection()!=null)
             System.out.println("not null");
         ex.printStackTrace();
    }
}
    public static String validateUser(UserDTO user)throws SQLException{
        
     ps.setString(1,user.getUserid());
     ps.setString(2,user.getPassword());
     ResultSet rs=ps.executeQuery();
     if(rs.next()){
     return rs.getString(8);
    }
     else
         return null;
        
    }
    
     
    public static ArrayList<CandidateDto> viewCandidate(String userid)throws SQLException
    {
        ArrayList<CandidateDto> candidate=new ArrayList<>();
        ps1.setString(1,userid);
        ResultSet rs=ps1.executeQuery();
        Blob blob;
        byte[] imageBytes;
        String base64Image;
        while(rs.next())
        {
            blob=rs.getBlob(4);
            imageBytes=blob.getBytes(1L,(int)blob.length());
            base64Image=Base64.getEncoder().encodeToString(imageBytes);
            candidate.add(new CandidateDto(rs.getString(1),rs.getString(2),rs.getString(3),base64Image));
        }
        return candidate;
        }
          
    public static ArrayList<UserDetails> getDetails()throws SQLException
    {
     ArrayList<UserDetails> u=new ArrayList<>();
     //    UserDetails user=new UserDetails();
       ResultSet rs=ps3.executeQuery();
        while(rs.next())
        {
            UserDetails  user=new UserDetails();
          
        user.setUsername(rs.getString(1));
        user.setUserid(rs.getString(2));
        user.setEmail(rs.getString(3));
        user.setAddress(rs.getString(4));
        user.setMobile(rs.getLong(5));
        user. setCity(rs.getString(6));
       // user.setLong(7,,rs.getString(7));
        u.add(user);
     
            //user.add(new UserDetails(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getLong(5),rs.getString(6),rs.getString(7)));
        
        }
        return u;
        }
    
   public static ArrayList<String> getUserId()throws SQLException{
 
    ResultSet rs=st3.executeQuery("select ADHAR_NO from user_details");
    ArrayList<String> id=new ArrayList<>();
    while(rs.next())
    {
        id.add(rs.getString(1));
    }
    return id;

}
   
   
   public static boolean deleteUser(String uid)throws Exception
{
     ps4.setString(1, uid);
      return(ps4.executeUpdate()!=0);
}
           
    
}

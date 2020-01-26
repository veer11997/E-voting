/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.CandidateDto;
import evoting.dto.VoteDto;
import java.io.IOException;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Base64;
import java.util.LinkedHashMap;

/**
 *
 * @author hp
 */
public class VoteDao {
    
        private static Statement st;
    private static PreparedStatement ps,ps2,ps5,ps3,ps4;
    
    static
    {
     try{
          st=DBConnection.getConnection().createStatement();
          ps4=DBConnection.getConnection().prepareStatement("select candidate_id from voting where user_id=? ");
         ps=DBConnection.getConnection().prepareStatement("select candidate_id from voting where user_id=?");
         ps2=DBConnection.getConnection().prepareStatement("select candidate_id,username,party,symbol from candidate,user_details where candidate.user_id=user_details.adhar_no and candidate_id=?");
        ps5=DBConnection.getConnection().prepareStatement("insert into voting values(?,?)");
        ps3=DBConnection.getConnection().prepareStatement("select candidate_id,count(*) from voting group by candidate_id order by count(*) desc");
     }
     catch(SQLException e)
     {
         e.printStackTrace();
         
     }
    }
    
    
    public static String getCandidateId(String userid)throws SQLException
    {
        ps.setString(1,userid);
        ResultSet rs=ps.executeQuery();
        if(rs.next())
        {
            return rs.getString(1);
        }
    return null;
    }
    
    public static CandidateDto getVote(String candidateid)throws SQLException,IOException
    {
     CandidateDto candidate=null;
     Blob blob;
     byte[] imageBytes;
     String cImage;
     ps2.setString(1,candidateid);
     ResultSet rs=ps2.executeQuery();
     if(rs.next())
     {
         blob=rs.getBlob(4);
         imageBytes=blob.getBytes(1L,(int)blob.length());
         cImage=Base64.getEncoder().encodeToString(imageBytes);
         candidate=new CandidateDto(rs.getString(1),rs.getString(2),rs.getString(3),cImage);
         
        
        
    }
     return candidate;
     
    }
    
    public static boolean  addVote(VoteDto vote)throws SQLException
    {
     ps5.setString(1,vote.getCandidateId());
        ps5.setString(2,vote.getVoterId());
        return (ps5.executeUpdate()!=0);
        
    }
    


public static LinkedHashMap<String,Integer> getResult()throws Exception
    {
        LinkedHashMap<String,Integer> result=new LinkedHashMap<>();
        ResultSet rs=ps3.executeQuery();
        while(rs.next())
            result.put(rs.getString(1), rs.getInt(2));
        return result;
    }
  public static int getVoteCount()throws SQLException
    {
        ResultSet rs=st.executeQuery("select count(*) from voting");
        if(rs.next())
            return rs.getInt(1);
        return 0;
    }




public static boolean validateVote(String userid)throws SQLException
{
    
    // ps4.setString(1,vote.getCandidateId());
        ps4.setString(1,userid);
        ResultSet rs=ps4.executeQuery();
        if(rs.next())
        {
            return true; //rs.getString(1);
        }
       return false;
      //  return (ps4.executeUpdate()!=0);}
    
}

}
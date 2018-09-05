package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Neeraj on 8/31/18.
 */
@Entity
public class AppUsers {
    @Id
    @Column(name="user_id")
    private Integer userId;

    @Column(name = "username")
    private String username;

    @Column(name = "userpassword")
    private String userpassword;

    @Column(name="firstname")
    private String firstname;

    @Column(name= "lastname")
    private String lastname;

    @Column(name="userrole")
    private String userrole;

    @Column(name = "useremail")
    private String useremail;

    public AppUsers() {
    }

    public AppUsers(Integer userId, String username, String userpassword, String firstname, String lastname, String userrole, String useremail) {
        this.userId = userId;
        this.username = username;
        this.userpassword = userpassword;
        this.firstname = firstname;
        this.lastname = lastname;
        this.userrole = userrole;
        this.useremail = useremail;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserpassword() {
        return userpassword;
    }

    public void setUserpassword(String userpassword) {
        this.userpassword = userpassword;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getUserrole() {
        return userrole;
    }

    public void setUserrole(String userrole) {
        this.userrole = userrole;
    }


    public String getUseremail() {
        return useremail;
    }

    public void setUseremail(String useremail) {
        this.useremail = useremail;
    }
}

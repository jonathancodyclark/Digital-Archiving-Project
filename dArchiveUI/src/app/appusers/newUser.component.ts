import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AppUsersService, AppUsers } from '../services/appusers.service';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'new-user-page',
  templateUrl: './newUser.component.html',
  styleUrls: ['./newUser.component.css']
})
export class NewUserComponent implements OnInit{

  title = 'New User Page';
  editing;
  appuser : AppUsers = {
  userId : undefined,
  userpassword : '',
  firstname: '',
  lastname: '',
  userrole: '',
  useremail: '',
  newuser: 1,
  }

  constructor(
    private router: Router,
    private appusersservice: AppUsersService,
    private loginService : LoginService,
    private cookieService : CookieService,
    private appusersService : AppUsersService,
  ){}

  
  ngOnInit() {
    //check that user is logged and has proper permissions to view users
    if(this.cookieService.get('token') == '') {
      this.router.navigate(['login/']); 
    } else if (this.cookieService.get('userrole') == 'USER') {
        this.router.navigate(['exhibits/'])
    }

    //verify that they are using their own password and not an auto-generated one
    //if they are using an auto-generated one have the user change it
    this.appusersService.getUser(this.cookieService.get('email')).subscribe(res => {
        var x = res["newuser"];
        console.log(res);
        if (x == 1) {
            this.appusersService.editedAppUser = res;
            this.router.navigate(['change/']);
        } else {
            //nothing
        }
        
      })

    //check whether the page has been loaded in an editing or adding capacity
    this.editing = false;
    if(this.appusersservice.editedAppUser != undefined) {
        this.editing = true;
        this.appuser = this.appusersservice.editedAppUser;
        this.appusersservice.editedAppUser = undefined;
        this.appuser.newuser = 1;
    }
  }


    //navigate back to users list page, for html use
    backToAppUsersPage() {
        this.router.navigate(['/manageusers/']);
    }

    //helper method to send email to new users with their autogenerated password
    sendEmail() {
        this.appusersservice.sendEmail(this.appuser, this.appuser.userpassword);
    }

    //depending on in what capacity the page has been loaded either save the edits to
    //the user or save the new user.
    saveAppUser() {
        if(this.editing) {
            this.appusersservice.updateUser(this.appuser).subscribe(res => {
                this.router.navigate(['/manageusers/']);
            });
        } else {
            this.appuser.userpassword = this.makeid();
            this.sendEmail();
            this.appusersservice.addUser(this.appuser).subscribe(res => {
                this.router.navigate(['/manageusers/']);
            });
        }
    }

    //helper method to generate a random alpha-numeric password.
    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
}
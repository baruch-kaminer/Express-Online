import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public constructor(private auth: AuthService, private router: Router){}

  public typePassword: string = 'password';
  public errorValidate:boolean = false;

  public credentials = new CredentialsModel();
  public async login(){
    this.errorValidate = false 
    try {
      await this.auth.login( this.credentials );
      this.router.navigateByUrl('/home');
    } catch (error:any) {
      console.log(error.message);
      if(error) this.errorValidate = true
    }
  }

  public showPassword():void{
    this.typePassword === 'text' ? this.typePassword = 'password' : this.typePassword = 'text';
  }
}

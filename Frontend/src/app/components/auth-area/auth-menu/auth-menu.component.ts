import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent {

  public constructor( public auth: AuthService ){}
    public user = this.auth;
    public userMenu = false;

    public displayUserMenu(){
      this.userMenu === true ? this.userMenu = false : this.userMenu = true;
    }
}

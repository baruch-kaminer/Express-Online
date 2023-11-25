import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import { AppConfig } from '../utils/app-config.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private config: AppConfig, private router: Router) { 
    const token = window.sessionStorage.getItem('token');
        if( token ) this.setUser(token);
  }

  public user: UserModel;
  public token: string;

  public async register(user: UserModel): Promise<void>{
    const observable = this.http.post<string>(this.config.registerUrl, user);
    const token = await firstValueFrom(observable);
    this.setUser(token);
    
  }

  public async login(credential: CredentialsModel): Promise<void>{
    
    const observable = this.http.post<string>(this.config.loginUrl, credential);
    
    const token = await firstValueFrom(observable);
    this.setUser(token);
  }

  public logout():void{
    this.token = '';
    window.sessionStorage.removeItem('token');
    this.router.navigateByUrl('/home')
}

  public setUser(token: string):void{
    this.token = token;
    window.sessionStorage.setItem('token', token);
    const deCode: any = jwtDecode(token);
    this.user = deCode.user;
  }

  public isLoggedIn():boolean{
    return this.token && this.token != '';
  }

  public async isIdOrEmailTaken(id: number, email: string):Promise<boolean> {
    const observable = this.http.get(this.config.isIdTakenUrl + id + '/email/' + email);
    const isId: any = await firstValueFrom(observable);
    return  isId && isId[0] > 0 || isId[1] > 0;
  }

  public getToken():string{
    return this.token;
  }


// public async map(){
//   try {
//     console.log(1234);
    
//     const observable = this.http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDEo8ae_a3tBBe1bwDekb1LmxLPoiePwxk&libraries=places&callback=initMap")
//     const mp = await firstValueFrom<{}>(observable)
//     console.log(observable);
//   } catch (error: any) {
//     console.log(error.message);
    
//   }
  
// }
 
}

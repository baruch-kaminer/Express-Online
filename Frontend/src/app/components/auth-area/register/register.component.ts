import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, map, startWith } from 'rxjs';


export interface City {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  isLinear = true;
  firstFormGroup: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordA: new FormControl('', Validators.required),
    // firstCtrl: new FormControl('' ),
  //   // last: new FormControl(''),
  });

  secondFormGroup: FormGroup = new FormGroup({
    // secondCtrl: new FormControl('') ,
    firstName: new FormControl('', Validators.required) ,
    lastName: new FormControl('', Validators.required) ,
    city: new FormControl('', Validators.required) ,
    street: new FormControl('', Validators.required) ,
  });
  @ViewChild('stepper', { static: false }) stepper: MatStepper;


  public constructor(private auth: AuthService, private router: Router, private _formBuilder: FormBuilder){}

  public options:City [] = [{name: 'ירושלים'}, {name: 'תל אביב'}, {name: 'חיפה'},
  {name: 'ראשון לציון'},{name: 'פתח תקווה '},{name: 'אשדוד'},{name: 'נתניה'},
  {name: 'בני ברק'},{name: 'באר שבע'},{name: 'חולון'},];
  filteredOptions: Observable<City[]>;

  ngOnInit(): void {
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map((value:any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }


  get userId(): any {
    return this.firstFormGroup.get('userId');
  }
  get email(): any {
    return this.firstFormGroup.get('email');
  }
  get password(): any {
    return this.firstFormGroup.get('password');
  }
  get passwordA(): any {
    return this.firstFormGroup.get('passwordA');
  }
  get firstName(): any {
    return this.secondFormGroup.get('firstName');
  }
  get lastName(): any {
    return this.secondFormGroup.get('lastName');
  }
  get city(): any {
    return this.secondFormGroup.get('city');
  }
  get street(): any {
    return this.secondFormGroup.get('street');
  }





  public user = new UserModel();
  public continuedRegister:boolean = false;
  public errorPassword:boolean = false;
  public errorValidate:boolean = false;
  public typePassword: string = 'password';
  public passwordAuthentication: string


  public async userTest():Promise<void>{

  this.errorPassword = false;
  this.errorValidate = false;
    if(this.user.password != this.passwordAuthentication){
      this.errorPassword = true;       
      return;
    }
    try {
        const isIdOrEmailTaken = await this.auth.isIdOrEmailTaken(this.user.userId, this.user.email);
        if(isIdOrEmailTaken){
          this.errorValidate = true;
          
          return;
        }  
        this.continuedRegister = true;
        this.stepper.next();
    } catch (error:any) {
        console.log(error.message);
    }
  }
  public nameCity: any

  public async register(): Promise<void>{
    for (let key in this.nameCity) {
      this.user.city = this.nameCity[key];
    }
    try {
      await this.auth.register(this.user);
      this.router.navigateByUrl('/home');
    } catch (error:any) {
      console.log(error.message);
    }
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  
}

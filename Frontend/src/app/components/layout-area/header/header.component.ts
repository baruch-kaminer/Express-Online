import { Component, Input, OnDestroy } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy  {

  @Input()
  search: boolean
  
  // event$
  public constructor(public router: Router){
    // this.event$
    //   =this.router.events
    //       .subscribe(
    //         (event: NavigationEvent) => {
              
    //           if(event instanceof NavigationStart) {
    //             this.href = event.url
    //             if(event.url === '/products'){
    //               this.search = true;  
    //             }else{
    //               this.search = false;
    //             }
    //             console.log(this.search);
                
    //           }
    //         })
    }
    public href:string;
    // public search =  true;
 
    ngOnDestroy() {
    //   this.event$.unsubscribe();
    }
  }



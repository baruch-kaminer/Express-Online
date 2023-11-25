import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


export interface City {
  name: string;
}

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit{

  public city = new FormControl('', [Validators.required, Validators.minLength(2)]);
  options:City [] = [{name: 'ירושלים'}, {name: 'תל אביב'}, {name: 'חיפה'},
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

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

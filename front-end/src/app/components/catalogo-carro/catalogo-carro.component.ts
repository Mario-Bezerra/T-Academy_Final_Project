import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnounceService } from 'src/app/Services/announce.service';
import { Announce, Car, Product, Address } from '../../Model/Models'

@Component({
  selector: 'app-catalogo-carro',
  templateUrl: './catalogo-carro.component.html',
  styleUrls: ['./catalogo-carro.component.css']
})
export class CatalogoCarroComponent {
  ads: Announce[] = []
  
  // Filters' options
  filters = {
    name: null,
    location: null,
    year: {
      from: null,
      to: null
    },
    price: {
      from: null,
      to: null
    },
    mileage: {
      from: null,
      to: null
    },
    automaker: [],
    color: [],
    condition: [],
    category: []
  };
  
  isBrandShow:boolean = false;
  isColorShow:boolean = false;
  isCategoryShow:boolean = false;

  constructor(private service: AnnounceService, private router: Router){
    this.getAll()
  }
  
  showAllBrands(){
    this.isBrandShow = !this.isBrandShow;
  }

  showAllColors(){
    this.isColorShow = !this.isColorShow;
  }

  showAllCategorys(){
    this.isCategoryShow = !this.isCategoryShow;
  }

  getAll(){
    this.service.getAllCars().subscribe( (data: any) => this.ads = <Announce[]>data.content)
  }

  log(){
    console.log(Object.keys(this.filters))
  }

  getCar(data: Product){
    return data as Car
  }

  filter(){
    this.service.getCarsByCriteria(this.filters).subscribe((data: any) => this.ads = <Announce[]>data.content)
  }

  clearAllFilters(){
    window.location.reload()
  }

  clearFilter(filter: any){
    for(let [key, value] of Object.entries(filter)){
      if(Array.isArray(value)){
        filter[key] = []
      } else if(typeof value == 'object' && value != null){
        this.clearFilter(value)
      } else{
        filter[key] = null
      }
    }
  }

  addFilterOption(key: any, value: any){
    let k = key as keyof typeof this.filters
    if(Array.isArray(this.filters[k])){
      const myArray = (this.filters[k] as Array<any>)
      if(myArray.indexOf(value) == -1){
        myArray.push(value)
      } else{
        const index = myArray.indexOf(value);
        if (index > -1) {
          myArray.splice(index, 1);
        }
      }
      this.filter()
    }
  }

}

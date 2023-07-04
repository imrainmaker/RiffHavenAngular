import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewProductDTO } from '../models/DTO/new-product-dto';
import { GuitarParts } from '../models/guitar-parts';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  Products: Products[] = []
  urlAPI: string = "https://localhost:7006/api/Product"

  constructor(private _http: HttpClient) {}

  AddProduct(product: NewProductDTO)  {
    console.log(product)
    
    return this._http.post<NewProductDTO>(this.urlAPI, product)

   
  }

  GetParts(): Observable<GuitarParts>{
    return this._http.get<GuitarParts>(this.urlAPI+"/Detail")
  }


}

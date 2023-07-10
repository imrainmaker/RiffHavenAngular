import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filtredProduct } from '../models/DTO/filtredProduct';
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

  AddProduct(product: NewProductDTO): Observable<number>{
    console.log(product)
    
    return this._http.post<number>(this.urlAPI, product)

   
  }

  GetParts(): Observable<GuitarParts>{
    return this._http.get<GuitarParts>(this.urlAPI+"/Detail")
  }

  GetProducts(): Observable<Products[]>{
    return this._http.get<Products[]>(this.urlAPI)
  }

  GetProductsFiltred(filter : filtredProduct): Observable<Products[]>{
    return this._http.post<Products[]>(this.urlAPI+"/Filter", filter)
  }

  DeleteProduct(id : number): Observable<boolean>{
    return this._http.delete<boolean>(this.urlAPI+"/"+id)
  }
}
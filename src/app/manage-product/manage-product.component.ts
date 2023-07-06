import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuitarParts } from '../models/guitar-parts';
import { Products } from '../models/products';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit{
  productList : Products[] = [];
  parts! : GuitarParts;
  myForm!: FormGroup;
  price! : number;
  min! : number;
  max! : number;
  



  
  constructor (private _APIService: APIService, private formBuilder: FormBuilder){
    this.myForm = this.formBuilder.group({
      price: [null],
      brand: [null],
      style: [null],
      color: [null],
      pickup: [null],
      scale: [null],
      frets: [null],
      tremolo: [null],
      bodyWood: [null],
      neckWood: [null],
      topWood: [null],
      fretboardWood: [null]
    });
  }

  ngOnInit() {
    this._APIService.GetProducts().subscribe({
      next: (data: Products[]) => {
        this.productList = data;
        this.min = this.getMinPrice(); 
        this.max = this.getMaxPrice(); 
      }
    });
    
    this._APIService.GetParts().subscribe({
      next : ( data : GuitarParts) => this.parts = data
    })
    
  }
  
  resetFilter() {
    this.myForm.reset();
  }

  getMinPrice(): number {
    if (this.productList && this.productList.length > 0) {
      return Math.min(...this.productList.map(product => product.price));
    }
    return 0;
  }
  
 
  getMaxPrice(): number {
    if (this.productList && this.productList.length > 0) {
      return Math.max(...this.productList.map(product => product.price));
    }
    return 0;
  }
  
  submitForm() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
  
      
      Object.keys(this.myForm.controls).forEach(key => {
        const control = this.myForm.get(key);
        if (control?.value === '') {
          control.setValue(null); 
        }
      });
  
      const formValue = this.myForm.value;
      this._APIService.GetProductsFiltred(formValue).subscribe({
        next: (data: Products[]) => this.productList = data
      });
    }
  }
  
  
}

import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { Observable } from 'rxjs';
import { APIService } from '../services/api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { GuitarParts } from '../models/guitar-parts';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product!: Products;
  myForm!: FormGroup;
  myGuitarForm!: FormGroup;
  myFiles: File[] = [];
  parts!: GuitarParts;
  productId! : number;

  constructor(private _APIService: APIService, private formBuilder: FormBuilder, private _UpService : UploadService, private _route: ActivatedRoute) {
    this.myForm = this.formBuilder.group({
      model: [''],
      description: [''],
      stock: [''],
      price: [''],
    });
    this.myGuitarForm = this.formBuilder.group({
      brand: [''],
      style: [''],
      color: [''],
      pickup: [''],
      scale: [''],
      frets: [''],
      tremolo: [''],
      bodyWood: [''],
      neckWood: [''],
      topWood: [''],
      fretboardWood: ['']
    });
  }

  ngOnInit() {
    this.productId = +this._route.snapshot.params['id'];
    this._APIService.GetProductById(this.productId).subscribe((data: Products) => {
      this.product = data;
  
      // Update the form controls with the retrieved data
      this.myForm.patchValue({
        model: this.product.model,
        description: this.product.description,
        stock: this.product.stock,
        price: this.product.price,
      });
      this.myGuitarForm.patchValue({
        brand: this.product.brand,
        style: this.product.style,
        color: this.product.color,
        pickup: this.product.pickup,
        scale: this.product.scale,
        frets: this.product.frets,
        tremolo: this.product.tremolo,
        bodyWood: this.product.bodyWood,
        neckWood: this.product.neckWood,
        topWood: this.product.topWood,
        fretboardWood: this.product.fretboardWood,
      });
    });

    this.subscribeFormControlChanges('brand');
    this.subscribeFormControlChanges('color');
    this.subscribeFormControlChanges('style');
    this.subscribeFormControlChanges('pickup');
    this.subscribeFormControlChanges('scale');
    this.subscribeFormControlChanges('frets');
    this.subscribeFormControlChanges('tremolo');
    this.subscribeFormControlChanges('bodyWood');
    this.subscribeFormControlChanges('neckWood');
    this.subscribeFormControlChanges('topWood');
    this.subscribeFormControlChanges('fretboardWood');
  
    this._APIService.GetParts().subscribe((data: GuitarParts) => (this.parts = data));
  }

  private subscribeFormControlChanges(controlName: string) {
    const control = this.myGuitarForm.get(controlName) as FormControl;
    control.valueChanges.subscribe((value) => {
      control.setValue(value, { emitEvent: false });
    });
  }

    loadFile(e: any) {
      this.myFiles = e.target.files;
    }
    submitGeneralForm() {
      if (this.myForm.valid) {
        const formValue = this.myForm.value
        this._APIService.UpdateProduct(this.productId, formValue ).subscribe((data: Products) => {
        this.product = data;
        if (this.myFiles.length > 0) {
      
          this._UpService.upload(this.product.id_Guitar, this.myFiles).subscribe();
        }
        

        });
      }

    }
    submitGuitarForm() {
      if (this.myGuitarForm.valid) {
        const formValue = this.myGuitarForm.value
        this._APIService.UpdateGuitar(this.productId, formValue ).subscribe((data: Products) => {
        this.product = data;
        
        });
      }
    }

}

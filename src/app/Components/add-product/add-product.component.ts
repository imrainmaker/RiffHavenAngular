import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NewProductDTO } from 'src/app/models/DTO/new-product-dto';
import { GuitarParts } from 'src/app/models/guitar-parts';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  myForm!: FormGroup;
  NewProduct!: NewProductDTO;
  brandControl!: FormControl;
  colorControl!: FormControl;
  styleControl!: FormControl;
  pickupControl!: FormControl;
  scaleControl!: FormControl;
  fretsControl!: FormControl;
  tremoloControl!: FormControl;
  bodyWoodControl!: FormControl;
  neckWoodControl!: FormControl;
  topWoodControl!: FormControl;
  fretboardWoodControl!: FormControl;
  parts!: GuitarParts;

  constructor(private _APIService: APIService, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      model: [''],
      description: [''],
      stock: [''],
      price: [''],
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
    this.myForm.get('brand')?.setValue('');
  }

  ngOnInit() {
    this.brandControl = this.myForm.get('brand') as FormControl;
    this.brandControl.valueChanges.subscribe((value) => {
      this.brandControl.setValue(value, { emitEvent: false }); 
    });

    this.colorControl = this.myForm.get('color') as FormControl;
    this.colorControl.valueChanges.subscribe((value) => {
      this.colorControl.setValue(value, { emitEvent: false }); 
    });

    this.styleControl = this.myForm.get('style') as FormControl;
    this.styleControl.valueChanges.subscribe((value) => {
      this.styleControl.setValue(value, { emitEvent: false }); 
    });

    this.pickupControl = this.myForm.get('pickup') as FormControl;
    this.pickupControl.valueChanges.subscribe((value) => {
      this.pickupControl.setValue(value, { emitEvent: false }); 
    });

    this.scaleControl = this.myForm.get('scale') as FormControl;
    this.scaleControl.valueChanges.subscribe((value) => {
      this.scaleControl.setValue(value, { emitEvent: false }); 
    });

    this.fretsControl = this.myForm.get('frets') as FormControl;
    this.fretsControl.valueChanges.subscribe((value) => {
      this.fretsControl.setValue(value, { emitEvent: false }); 
    });

    this.tremoloControl = this.myForm.get('tremolo') as FormControl;
    this.tremoloControl.valueChanges.subscribe((value) => {
      this.tremoloControl.setValue(value, { emitEvent: false }); 
    });

    this.bodyWoodControl = this.myForm.get('bodyWood') as FormControl;
    this.bodyWoodControl.valueChanges.subscribe((value) => {
      this.bodyWoodControl.setValue(value, { emitEvent: false }); 
    });

    this.neckWoodControl = this.myForm.get('neckWood') as FormControl;
    this.neckWoodControl.valueChanges.subscribe((value) => {
      this.neckWoodControl.setValue(value, { emitEvent: false }); 
    });

    this.topWoodControl = this.myForm.get('topWood') as FormControl;
    this.topWoodControl.valueChanges.subscribe((value) => {
      this.topWoodControl.setValue(value, { emitEvent: false }); 
    });

    this.fretboardWoodControl = this.myForm.get('fretboardWood') as FormControl;
    this.fretboardWoodControl.valueChanges.subscribe((value) => {
      this.fretboardWoodControl.setValue(value, { emitEvent: false }); 
    });


   this._APIService.GetParts().subscribe({
    next : (data : GuitarParts) => this.parts = data
   });
  }
  
  submitForm() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value
      this._APIService.AddProduct(formValue)
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NewProductDTO } from 'src/app/models/DTO/new-product-dto';
import { GuitarParts } from 'src/app/models/guitar-parts';
import { APIService } from 'src/app/services/api.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  myForm!: FormGroup;
  NewProduct!: NewProductDTO;
  parts!: GuitarParts;
  myFiles: File[] = [];
  url : string = ""

  constructor(private _APIService: APIService, private formBuilder: FormBuilder, private _UpService : UploadService) {
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


   this._APIService.GetParts().subscribe({
    next : (data : GuitarParts) => this.parts = data
   });
  }

  private subscribeFormControlChanges(controlName: string) {
    const control = this.myForm.get(controlName) as FormControl;
    control.valueChanges.subscribe((value) => {
      control.setValue(value, { emitEvent: false });
    });
  }

  loadFile(e: any) {
    this.myFiles = e.target.files;
  }

  

  resetForm() {
    this.myForm.reset();
    this.myForm.get('brand')?.setValue("");
    this.myForm.get('color')?.setValue("");
    this.myForm.get('style')?.setValue("");
    this.myForm.get('pickup')?.setValue("");
    this.myForm.get('scale')?.setValue("");
    this.myForm.get('frets')?.setValue("");
    this.myForm.get('tremolo')?.setValue("");
    this.myForm.get('bodyWood')?.setValue("");
    this.myForm.get('neckWood')?.setValue("");
    this.myForm.get('topWood')?.setValue("");
    this.myForm.get('fretboardWood')?.setValue("");
  

  }
  
  submitForm() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value
      this._APIService.AddProduct(formValue).subscribe({
        next : (idGuitar : number) => {
          if (this.myFiles.length > 0) {
      
            this._UpService.upload(idGuitar, this.myFiles).subscribe();
          }
          this.resetForm();
          this._APIService.GetParts().subscribe({
            next : (data : GuitarParts) => this.parts = data
           });

        }
      })
      
    }
  }
}
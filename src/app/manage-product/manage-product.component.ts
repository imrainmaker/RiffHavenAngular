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
export class ManageProductComponent implements OnInit {
  productList: Products[] = [];
  parts!: GuitarParts;
  myForm!: FormGroup;
  price!: number;
  min!: number;
  max!: number;
  imageLoaded: boolean[] = []; 
  currentPage: number = 1;

  constructor(private _APIService: APIService, private formBuilder: FormBuilder) {
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
        
        this.productList.sort((a, b) => (a.id_Guitar > b.id_Guitar ? -1 : 1));
        // Initialize image loaded status for each product
        this.imageLoaded = new Array(this.productList.length).fill(false);

        // Preload images
        this.productList.forEach((product: Products, index: number) => {
          const image = new Image();
          const imagePath = `assets/Guitars/Guitar${product.id_Guitar}/preview.jpg`;
          const defaultImagePath = 'assets/preview.png';

          image.src = imagePath;
          image.onerror = () => {
            this.imageLoaded[index] = false; // Mark image as not loaded
          };
          image.onload = () => {
            this.imageLoaded[index] = true; // Mark image as loaded
          };
        });
      }
    });


    this._APIService.GetParts().subscribe({
      next: (data: GuitarParts) => (this.parts = data)
    });
  }
  
  getProductListForCurrentPage(): Products[] {
    const itemsPerPage = 5;
    const startIndex = (this.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.productList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }
  
  getPaginationArray(): number[] {
    const totalPages = this.getTotalPages();
    const visiblePages = 5; // Adjust the number of visible pages here
  
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);
  
    // Adjust the start and end pages if the total number of pages is less than the visible pages
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
  
  getTotalPages(): number {
    const itemsPerPage = 5;
    return Math.ceil(this.productList.length / itemsPerPage);
  }

  resetFilter() {
    this.myForm.reset();
  }

  getMinPrice(): number {
    if (this.productList && this.productList.length > 0) {
      return Math.min(...this.productList.map((product) => product.price));
    }
    return 0;
  }

  getMaxPrice(): number {
    if (this.productList && this.productList.length > 0) {
      return Math.max(...this.productList.map((product) => product.price));
    }
    return 0;
  }

  DeleteProduct(id: number){
    console.log(id);
    this._APIService.DeleteProduct(id).subscribe()
    const formValue = this.myForm.value;
    this._APIService.GetProductsFiltred(formValue).subscribe({
      next: (data: Products[]) => {
        this.productList = data
        this.productList.sort((a, b) => (a.id_Guitar > b.id_Guitar ? -1 : 1));
      }
    });
  }

  submitForm() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);

      Object.keys(this.myForm.controls).forEach((key) => {
        const control = this.myForm.get(key);
        if (control?.value === '') {
          control.setValue(null);
        }
      });

      const formValue = this.myForm.value;
      this._APIService.GetProductsFiltred(formValue).subscribe({
        next: (data: Products[]) => {
          this.productList = data
          this.productList.sort((a, b) => (a.id_Guitar > b.id_Guitar ? -1 : 1));
        }
      });
    }
  }
}

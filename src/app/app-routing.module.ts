import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
                        { path: 'Add-Product', component: AddProductComponent},
                        { path: 'Manage-Product', component: ManageProductComponent},
                        { path: 'Edit-Product/:id', component: EditProductComponent},
                        { path: '', component: ManageProductComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

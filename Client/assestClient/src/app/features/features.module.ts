import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
//import { AssetCategoryComponent } from './asset-category/asset-category.component';


@NgModule({
  declarations: [
   // AssetCategoryComponent
  ],
  imports: [
    CommonModule,  
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }

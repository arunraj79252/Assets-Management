import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetCategoryService {
  private API_ENDPOINT = environment.API_ENDPOINT

  constructor(private http:HttpClient) { }

  listAssetCategories(){
     return this.http.get(this.API_ENDPOINT+"category/listAll/");
  }
  deleteCategory(id:any){
    return this.http.delete(this.API_ENDPOINT+"category/delete/"+id);
  }
  addCategory(formdata:any){
    return this.http.post(this.API_ENDPOINT+"category/create/",formdata);
  }
  editCategory(formdata:any){
    return this.http.put(this.API_ENDPOINT+"category/update/"+formdata.category_id,formdata);
  }
  // addAttribute(formdata:any){
  //   return this.http.post(this.API_ENDPOINT+"category-attribute/create/",formdata);
  // }
  
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
   providedIn: 'root'
})
export class AssetService {
   selAssetId: number = 0
   selUserId: number = 0
   mode: string = 'default'


   constructor(private http: HttpClient) { }
   listAllAssets() {

      return this.http.get(`${environment.API_ENDPOINT}asset/list`);

   }
   listAssetById(id: number) {

      return this.http.get(`${environment.API_ENDPOINT}asset/list/` + id);

   }
   createAsset(formdata: any) {

      return this.http.post(`${environment.API_ENDPOINT}asset/create`, formdata);

   }
   editAsset(id: number, formdata: any) {

      return this.http.put(`${environment.API_ENDPOINT}asset/edit/` + id, formdata);

   }
   deleteAsset(id: number) {

      return this.http.delete(`${environment.API_ENDPOINT}asset/delete/` + id);

   }
   getAssetsByCategory(id: number) {

      return this.http.get(`${environment.API_ENDPOINT}asset/listByCategory/` + id);

   }
   assetSearch(category: string,model:string,manufacturer:string, status: string, auditstatus: string, assignment: string, assignedto: string, assignedon: string) {
      return this.http.get(`${environment.API_ENDPOINT}asset/search?page=&size=&status=` + status + `&audit_status=` + auditstatus +
         `&employee_id=` + assignedto + `&updated_date=` + assignedon + `&assigned=` + assignment + `&category_id=` + category+ 
         `&model_name=` + model+ `&manufacturer=` + manufacturer);

   }
   usersWithAssets() {
      return this.http.get(`${environment.API_ENDPOINT}user/details/employees/assigned`);
   }

   //Getter & Setter Functions
   setSelAssetId(id: number) {
      this.selAssetId = id;
   }
   getSelAssetId() {
      return this.selAssetId;
   }

   setSelUserId(id: number) {
      this.selUserId = id;
   }

   getSelUserId() {
      return this.selUserId
   }

   setMode(mode: string) {
      this.mode = mode;
   }

   getMode() {
      return this.mode;
   }

}

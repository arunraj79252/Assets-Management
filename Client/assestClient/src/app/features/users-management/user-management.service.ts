import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private API_ENDPOINT = environment.API_ENDPOINT

  constructor(private http:HttpClient) { }

  addUser(data:any){
    return this.http.post<any>(this.API_ENDPOINT+"user/create/",data);
  }

  listUsers(pageNo:any,size:any,search:any,status:any){
     return this.http.get<any>(this.API_ENDPOINT+"user/list?page="+pageNo+"&size="+size+search+"&status="+status);
  }

  editUser(id:any,user:any):Observable<any>{
    return this.http.put<any>(this.API_ENDPOINT+"user/update/"+id,user);
  }

  userDetails(id:any){
    return this.http.get<any>(this.API_ENDPOINT+"user/detail/"+id);
  }
  

}

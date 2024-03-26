import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataSource: BehaviorSubject<any> = new BehaviorSubject<any>('Initial Value');
  data: Observable<any> = this.dataSource.asObservable();//data to edit user form
  user_id:Observable<any>=this.dataSource.asObservable();

  constructor() { /* TODO document why this constructor is empty */  }

  sendData(data: any) {
    this.dataSource.next(data);
  }
  sendUserId(user_id:any){
    this.dataSource.next(user_id);
  }
  
}





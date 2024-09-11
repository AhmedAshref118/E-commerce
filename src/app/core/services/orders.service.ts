import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) {}

myHeaders:any = {token : localStorage.getItem('userToken')}

  chechOut(idCart:string |null ,shippingDetails:object ):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200`,

      {
            "shippingAddress":shippingDetails
      },
      {
        headers:this.myHeaders
      }
      
    )

  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllCarts(params?: any) {
    let myParams = new HttpParams()
    myParams = myParams.append('startDate', params?.start).append('endDate', params?.end)
    return this.http.get(environment.baseApi + 'carts', { params: myParams })
  }
}

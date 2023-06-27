import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {


  private _api : string = 'http://localhost:3000'

  constructor( private http : HttpClient) { }


   checkStatus() : Observable<boolean>  { 
    return this.http.get<boolean>(`${this._api}/checkStatus`)
  }
}

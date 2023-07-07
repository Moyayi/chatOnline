import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  templateUrl: './error-server.component.html',
  styleUrls: ['./error-server.component.scss']
})
export class ErrorServerComponent implements OnInit{

  status : boolean = false;
  checkTimeStatus : number = 60000
  constructor(public apiCall : ApiCallService)
  {}

  ngOnInit(): void {
    console.log("entra?")
    this.checkStatusServer();
  }

  checkStatusServer() : void {
    console.log("checkStatusServer")
    setInterval(() => {
      console.log('SetTImeout')
      this.apiCall.checkStatus().subscribe({
        next: (resp) => {
          this.status = resp
          
        },
        error: (error) => {
          console.log("Nope entra en error")
          
        }
      })
        
    }
    , this.checkTimeStatus)

  
  }
  
}

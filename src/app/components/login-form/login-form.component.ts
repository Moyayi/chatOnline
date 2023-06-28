import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { SocketService } from 'src/app/socketService/socket.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy{

  loginForm = new FormGroup({
    username : new FormControl(''),
  })
  
  delay : Function = (ms ? : number) : Promise<void> => { 
    return new Promise ( res => setTimeout(res, ms || 2000))
  }

  checkStatus : boolean = true;

  constructor(
    private socket : SocketService,
    private _route : Router,
    private _service : ApiCallService
  ){}
  
  async ngOnInit(): Promise<void> {
    //TODO call the server to get status
    //if server doesnt response, call ngDestroy and disconnect
    this._service.checkStatus().subscribe({
      next: (resp) => {
        this.loading();
      },
      error : ( ) => {
        this.ngOnDestroy()
        this._route.navigate(['/errorServer'])
      }
    })
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  login(){
    this.socket.loginUsername(this.loginForm.controls['username'].value!)
    // TODO Guard and check if server is up, after that redirect to another component
    this._route.navigate(['Chats'])
  }
  
  async loading() { 
    await this.delay()
    this.checkStatus = false;
  }

}

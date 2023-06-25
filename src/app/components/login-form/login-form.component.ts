import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  
  delay : Function = () : Promise<void> => { 
    return new Promise ( res => setTimeout(res, 3000))
  } 

  constructor(
    private socket : SocketService,
    private _route : Router
  ){}
  
  ngOnInit(): void {
    //TODO call the server to get status
    //if server doesnt response, call ngDestroy and disconnect
    this.delay();
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  login(){
    this.socket.loginUsername(this.loginForm.controls['username'].value!)
    // TODO Guard and check if server is up, after that redirect to another component
    this._route.navigate(['chats'])
  }
  
}

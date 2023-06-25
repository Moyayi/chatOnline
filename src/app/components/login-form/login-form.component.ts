import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socketService/socket.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  loginForm = new FormGroup({
    username : new FormControl(''),
  })


  constructor(
    private socket : SocketService,
    private _route : Router
  ){}
  

  login(){
    this.socket.loginUsername(this.loginForm.controls['username'].value!)
    // TODO Guard and check if server is up, after that redirect to another component
    this._route.navigate(['chats'])
  }
  
}

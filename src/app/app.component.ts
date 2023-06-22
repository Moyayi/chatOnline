import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socketService/socket.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'chatOnlineAngular';
  loginForm = new FormGroup({
    username : new FormControl(''),
  })


  constructor(
    private socket : SocketService
  ){}

  ngOnInit(): void {
    // TODO something here i guess
  }

  login(){
    this.socket.loginUsername(this.loginForm.controls['username'].value!)
  }
}



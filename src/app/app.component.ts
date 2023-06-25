import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socketService/socket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'chatOnlineAngular';


  chatForm = new FormGroup({
    message : new FormControl('')
  })


  constructor(
    private socket : SocketService,
  ){}
  message(){
    if(this.chatForm.controls['message'].value?.trim() === "") return ;
    this.socket.sendMessage(this.chatForm.controls['message'].value!)
  }
}



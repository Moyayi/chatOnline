import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { messageChat } from 'src/app/interfaces/roomsChats.interface';
import { LoginFormComponent } from 'src/app/pages/login/login-form.component';
import { SocketService } from 'src/app/socketService/socket.service';

@Component({
  selector: 'app-messages-chat',
  templateUrl: './messages-chat.component.html',
  styleUrls: ['./messages-chat.component.scss'],

})
export class MessagesChatComponent{

  @Input() room! : string;
  @Input() socket! : SocketService;
  
  messageForm = new FormGroup({
    message : new FormControl('', [ Validators.required, Validators.minLength(6)]),
  })
  contador : number = 0
  messageToSend : messageChat = {
    room : '',
    message : '',
    username : localStorage.getItem('username')?.toString()!,
    valueNumber : this.contador
  }

  constructor(){
    
  }

  

  sendMessage(){
    this.messageToSend.message = this.messageForm.controls['message'].value!
    this.messageToSend.room = this.room
    
    this.socket.sendMessage(this.messageToSend)

    this.messageForm.controls['message'].reset();
    this.contador++;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, map } from 'rxjs'
import { RoomsChats, messageChat } from '../interfaces/roomsChats.interface';
import { ApiCallService } from '../services/api-call.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  rooms : RoomsChats [] = []
  public message$: BehaviorSubject<messageChat> = new BehaviorSubject({
    username: '',
    room : '',
    message : ''
  })
  
  messageFromChat : messageChat = {
    room:     "",
    message: "",
    username : ""
  }
  
  constructor(
    private socket : Socket, 
  ) {
    
    // this.socket.on('login', (msg : string) => {
    //   console.log(msg)
    // })

    // this.socket.on('message', (msg : string ) => { 
    //   console.log(`Message from the server Channel  - ${msg}`)
    // })

    // this.socket.on('VideoJuegos', (msg : string ) => { 
    //   this.getMessage()
    // })

    // this.socket.on('connect_error', () => {
    //   //TODO i have to think about it
    // })
  }


  connectRoom( room : string ){
    this.socket.emit('join room', room)
  }

  sendMessage( data : messageChat ) {
    this.socket.emit('message', JSON.stringify(data))
  }

  loginUsername( msg : string){
    this.socket.emit('login', msg )
  }

  getSocketUsername() : string {
    return this.socket.ioSocket.id
  }


  // getMessage(){
  //   return this.socket.fromEvent('message')
  //   .pipe(
  //     map((data) => {console.log(data)})
  //   )
  // }

  // getMessage() : messageChat{
  //   debugger
  //   this.socket.on('message', (message : string ) => {
  //     this.messageFromChat = JSON.parse(message);
  //     return this.messageFromChat
  //   })

  //   return this.messageFromChat
    
  // }

  getMessage(){
    this.socket.on('message', (message : any) => { 
      this.message$.next(message)
    });

    return this.message$.asObservable();
  }

  disconnect() : void { 
    this.socket.disconnect();
  }
}

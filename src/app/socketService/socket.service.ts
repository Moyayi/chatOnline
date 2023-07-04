import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs'
import { RoomsChats, messageChat } from '../interfaces/roomsChats.interface';
import { ApiCallService } from '../services/api-call.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  rooms : RoomsChats [] = []
   
  constructor(
    private socket : Socket, 
  ) {
    
    this.socket.on('login', (msg : string) => {
      console.log(msg)
    })

    this.socket.on('message', (msg : string ) => { 
      console.log(`Message from the server Channel  - ${msg}`)
    })

    this.socket.on('VideoJuegos', (msg : string ) => { 
      console.log(msg)
    })

    this.socket.on('connect_error', () => {
      //TODO i have to think about it
    })
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

  getMessage(){
    return this.socket.fromEvent('welcomed')
    .pipe(
      map((data) => console.log(data))
    )
  }

  disconnect() : void { 
    this.socket.disconnect();
  }
}

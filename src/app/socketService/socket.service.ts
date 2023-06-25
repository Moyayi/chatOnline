import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket : Socket, private router : Router) {

    console.log(this.socket)
    this.socket.on('login', (msg : string) => {
      console.log(msg)
    })

    this.socket.on('message', (msg : string ) => { 
      console.log(`Message from the server Channel  - ${msg}`)
    })


    this.socket.on('connect_error', () => {
      //TODO i have to think about it
    })
  }

  sendMessage( msg : string ) {
    this.socket.emit('message', msg)
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

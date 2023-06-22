import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket : Socket) {
    this.socket.on('welcomed', (msg : string) => {
      console.log(msg)
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
}

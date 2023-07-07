import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RoomsChats, messageChat } from 'src/app/interfaces/roomsChats.interface';
import { ApiCallService } from 'src/app/services/api-call.service';
import { SocketService } from 'src/app/socketService/socket.service';


@Component({
  selector: 'app-load-chats',
  templateUrl: './load-chats.component.html',
  styleUrls: ['./load-chats.component.scss']
})
export class LoadChatsComponent implements OnInit, AfterViewInit{
  
  @Input() socket! : SocketService;


  activedRoom : string = ''
  chats : RoomsChats [] = []

  messageFromChat : messageChat[] = []

  constructor(
    private _apiService : ApiCallService
  )
  {}

  ngOnInit(): void {
    this._apiService.roomsAviable().subscribe(res => { 
      this.chats  = res
    })
  }

  ngAfterViewInit(): void {
    

    this.socket.getMessage().subscribe((message : messageChat ) => {
      // let testing = JSON.parse(message)
      // console.log(typeof(testing), testing)
      console.log('acaba de entrar en ngOnInit')
      if(message.username === '') {
        return
      }
      this.messageFromChat.push(message)
    })
  }

  clickedRoom( room : string ){
    //TODO set messages to 0 after clicked on the room
    
    let currentRoom = document.getElementById(room)
    let previousRoom = document.getElementById(this.activedRoom);

    console.log(`Acitve room ${this.activedRoom}  - new room ${room}`)

    if(this.activedRoom === ''){
      console.log("entraaaa en cuando está vacio")
      this.activedRoom = room
      console.log(currentRoom)
      currentRoom?.classList.remove('hidden')
      currentRoom?.classList.add('active')

    }else{
      previousRoom?.classList.remove('active')
      previousRoom?.classList.add('hidden')
      
      currentRoom?.classList.remove('hidden')
      currentRoom?.classList.add('active')
      
      this.activedRoom = room
    }



    this.activedRoom = room
  }

}



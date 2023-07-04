import { Component, OnInit } from '@angular/core';
import { RoomsChats } from 'src/app/interfaces/roomsChats.interface';
import { ApiCallService } from 'src/app/services/api-call.service';


@Component({
  selector: 'app-load-chats',
  templateUrl: './load-chats.component.html',
  styleUrls: ['./load-chats.component.scss']
})
export class LoadChatsComponent implements OnInit{
  
  activedRoom : string = ''
  chats : RoomsChats [] = []
  constructor(
    private _apiService : ApiCallService
  )
  {}

  ngOnInit(): void {
    this._apiService.roomsAviable().subscribe(res => { 
      this.chats  = res
      console.log(this.chats)
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



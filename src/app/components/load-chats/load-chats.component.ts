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
    
    this.activedRoom = room
  }

}



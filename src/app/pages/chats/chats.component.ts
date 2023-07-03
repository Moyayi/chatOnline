import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit{

//TODO TEMP remove after added guard with ngOnInit
  constructor(
    private _router : Router
  ){

  }

  ngOnInit(): void {
    if(!localStorage.getItem('username')){
      this._router.navigate([''])
    }
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule} from '@angular/common/http'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadChatsComponent } from './components/load-chats/load-chats.component';
import { LoginFormComponent } from './pages/login/login-form.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ErrorServerComponent } from './pages/error-server/error-server.component';
import { MaterialComponentsModule } from './components/material/material-components.module';
import { MessagesChatComponent } from './components/messages-chat/messages-chat.component';

const config : SocketIoConfig = { 
  url : 'http://localhost:3000', 
  options:{
    withCredentials : false,
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoadChatsComponent,
    LoginFormComponent,
    ChatsComponent,
    ErrorServerComponent,
    MessagesChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    MaterialComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ErrorServerComponent } from './pages/error-server/error-server.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path:'Chats',
    component: ChatsComponent
  },
  {
    path: 'errorServer',
    component: ErrorServerComponent
  },
  {
    path:'**',
    redirectTo: ''
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

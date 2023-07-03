import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
LoginFormComponent
import { ChatsComponent } from './pages/chats/chats.component';
import { ErrorServerComponent } from './pages/error-server/error-server.component';
import { authGuard } from './services/guards/auth.guard';
import { LoginFormComponent } from './pages/login/login-form.component';
const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path:'Chats',
    component: ChatsComponent,
    // canActivate: [authGuard]
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

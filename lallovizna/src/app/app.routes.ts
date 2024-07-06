import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { BoComponent } from './components/bo/bo.component';
import { LoginComponent } from './components/login/login.component';
import { tokenGuard } from './guards/token.guard';

export const routes: Routes = [
  {
    path: 'menu', component: MenuComponent 
  }, {
    path: 'bo/login', component: LoginComponent
  },{
    path: 'bo', component: BoComponent , 
    canActivate:[tokenGuard]
  }, {
    path: '', redirectTo: '/menu', pathMatch: 'full'
  }, {
    path: '**', redirectTo: '/menu'
  }
];

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';

import {MenuModule} from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import { BoardComponent } from './board/board.component';
import { Routes, RouterModule } from '@angular/router';
import { BacklogComponent } from './backlog/backlog.component';
import { SettingsComponent } from './settings/settings.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';


const appRoutes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: 'backlog', component: BacklogComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoardComponent,
    BacklogComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ButtonModule,
    RippleModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

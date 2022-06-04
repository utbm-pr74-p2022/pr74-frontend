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
import { BacklogComponent } from './backlog/backlog.component';
import { SettingsComponent } from './settings/settings.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { ConnectionComponent } from './connection/connection.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoardComponent,
    BacklogComponent,
    SettingsComponent,
    ConnectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    InputTextModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

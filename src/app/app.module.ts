import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { BoardComponent } from './board/board.component';
import { BacklogComponent } from './backlog/backlog.component';
import { SettingsComponent } from './settings/settings.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConnectionComponent } from './connection/connection.component';
import { ProjectsComponent } from './projects/projects.component';
import { DragDropModule } from 'primeng/dragdrop';
import {RadioButtonModule} from 'primeng/radiobutton';
import { httpInterceptorProviders } from './interceptors';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoardComponent,
    BacklogComponent,
    SettingsComponent,
    ConnectionComponent,
    ProjectsComponent
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
    FormsModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ScrollingModule,
    HttpClientModule,
    DialogModule,
    MultiSelectModule,
    DragDropModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    ChipModule,
    TagModule,
    ConfirmPopupModule
  ],
  providers: [httpInterceptorProviders, DatePipe, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

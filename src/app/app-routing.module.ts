import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';
import { ConnectionComponent } from './connection/connection.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: ConnectionComponent},
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'backlog', component: BacklogComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

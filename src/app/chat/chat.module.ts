import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatDirective } from './chat.directive';
import { SharedModule } from '../shared';
import { ChatRoomsComponent } from './chat-rooms.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatRoomResolver } from './chat-room-resolver';

const routes: Routes = [
  {
    path: 'rooms',
    component: ChatRoomsComponent
  },
  {
    path: ':id',
    component: ChatComponent,
    resolve:{
      room:ChatRoomResolver
    }
  },
  { path: "", pathMatch: "full", redirectTo: "/chats/rooms" }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatComponent, ChatDirective, ChatRoomsComponent]
})
export class ChatModule { }

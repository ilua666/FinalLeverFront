import { Message } from './../Classes/message';
import { API_GOOGLE_LOGIN,API_PROFILE, API_ROOT, API_MESSAGE } from '../resource';
import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../Classes/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient)  { }
  messages:Message[];
  editMessage:Message;
  profile: Profile;
  messageText:string;

  ngOnInit(): void {
    this.refreshMessages();
    this.refreshProfile();
  }

  onNewMessageClick(){
    this.http.post(API_ROOT + API_MESSAGE,{text:this.messageText}).subscribe((resp: Message[]) => {
      this.refreshMessages()
    });
  }
  
  onPutProfile(){
    this.http.put(API_ROOT + API_PROFILE,this.profile).subscribe((resp: Message[]) => {
      this.refreshProfile();
    });
  }
  onSelect(message:Message){
    this.editMessage = message;
  }

  onEditMessage(){
    this.http.put(API_ROOT + API_MESSAGE,this.editMessage,{params:{id:this.editMessage._id}}).subscribe((resp: Message[]) => {
      this.refreshMessages();
    });
  }
  onDeleteMessage(message:Message){
    this.http.delete(API_ROOT+ API_MESSAGE, {params:{id:message._id}}).subscribe((resp: Message[]) => {
      this.refreshMessages();
    });
  }

  refreshMessages(){
    this.http.get(API_ROOT + API_MESSAGE).subscribe((resp: Message[]) => {
        this.messages = resp
      });
  }

  refreshProfile(){
    this.http.get(API_ROOT + API_PROFILE).subscribe((resp: Profile) => {
      this.profile = resp
    });
  }

}

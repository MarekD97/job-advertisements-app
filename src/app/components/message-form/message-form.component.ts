import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  @Input() messageTo: string;
  @Input() receiverId: string;
  @Input() advertisementId: string;
  messageForm: FormGroup;
  constructor(public fs: FirebaseService, public fb: FormBuilder) {
    fs.auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('error');
      }
    });
    this.messageForm = this.fb.group({
      content: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    console.log('cancel');
  }

  sendMessage(fg: FormGroup): void {
    this.fs.sendMessage(this.receiverId, this.fs.currentUser.uid, this.advertisementId, fg.value.content);
  }

}

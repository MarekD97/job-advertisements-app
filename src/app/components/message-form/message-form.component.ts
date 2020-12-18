import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  @Input() color: string;
  @Output() public cancelClick: EventEmitter<any> = new EventEmitter();
  messageForm: FormGroup;
  public sendStatus = false;
  constructor(public fs: FirebaseService, public fb: FormBuilder, private router: Router) {
    fs.auth.onAuthStateChanged((user) => {
      if (!user) {
        router.navigate(['/account/login']);
      }
    });
    this.messageForm = this.fb.group({
      content: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.cancelClick.emit();
  }

  sendMessage(fg: FormGroup): void {
    this.fs.sendMessage(this.receiverId, this.fs.currentUser.uid, this.advertisementId, fg.value.content);
    this.sendStatus = true;
  }

}

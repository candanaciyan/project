import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-dialogue',
  templateUrl: './main-dialogue.component.html',
  styleUrl: './main-dialogue.component.scss'
})
export class MainDialogueComponent {

  called = '';
 
  constructor(
    public dialogRef: MatDialogRef<MainDialogueComponent>,  
    public route: ActivatedRoute,
  ) {}

  buttonYesClick() {
    this.dialogRef.close({"result": "yes"});
  }


  buttonNoClick() {
    this.dialogRef.close({"result": "no"});
  }
}

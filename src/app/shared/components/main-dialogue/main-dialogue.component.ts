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
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,

  ) {}
//yes ve no butonlarina basinca cagrilacak metotlari girdi

  buttonYesClick() {
    this.dialogRef.close({"result": "yes"});
  }
  //close cagirirken close icine dialogResult tipinde istedigimiz herhangi bir cevabi dondurebiliyoruz
//bu dialogu kapatmaya yarayacak icindeki result 

  buttonNoClick() {
    this.dialogRef.close({"result": "no"});
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShelfService } from '../../../shared/service/shelf.service';
import { LoginService } from '../../../core/service/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ShelfEditComponent } from '../shelf-edit/shelf-edit.component';
import { MainDialogueComponent } from '../../../shared/components/main-dialogue/main-dialogue.component';
import { Shelf } from '../../../shared/model/shelf';
import { ShelfCreateComponent } from '../shelf-create/shelf-create.component';

@Component({
  selector: 'app-shelf-management',
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})


//ve bunda daa init e ihtiyacim oldugu icin

export class ShelfManagementComponent implements OnInit {
  shelves: Shelf[]  = [];
  selectedShelf: Shelf | null = null;




  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private shelfService: ShelfService,
    private loginService: LoginService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.refreshShelves();
  }
  //boyle de cagirmis olduk


  refreshShelves() {
    this.shelfService.getAllShelves().subscribe({
      next: (data) => {
        this.shelves = data;
      }
    });
  }
  createShelf() {
    let dialog =  this.dialog.open(ShelfCreateComponent, {
      width: '500px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      disableClose: true,
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          // box creating...data geliyorsa box kayit edecegiz
          this.shelfService.createShelf(data.capacity, data.count).subscribe({
            next: (res) => {
              this.toastr.info(res.message + ' shelves created');
              this.refreshShelves();
            }
          });
        }
      }
    });
  }
  selectShelf(shelf: Shelf) {
    if (shelf == this.selectedShelf) {
      this.selectedShelf = null;
    } else {
      this.selectedShelf = shelf;
    }
  }
  editShelf() {
    let dialog =  this.dialog.open(ShelfEditComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.shelfService.updateShelf(this.selectedShelf!.id, data.capacity).subscribe({
            next: (data) => {
              this.toastr.info('Shelf updated');
              this.refreshShelves();
            },
            error: (err) => {
              this.toastr.error(err.error.mesaj);
            }
          });
        }
      }
    });
  }
  deleteShelf() {
    let dialog =  this.dialog.open(MainDialogueComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data?.result === 'yes') {
          this._deleteShelf();
        }
      }
    });
    dialog.componentInstance.question = 'Are you sure for delete this shelf?';

  }
  _deleteShelf() {
    if (this.selectedShelf) {
      this.shelfService.deleteShelf(this.selectedShelf.id).subscribe({
        next: (data) => {
          this.toastr.info('Shelf deleted');
          this.refreshShelves();
        },
        error: (err) => {
          this.toastr.error(err.error.mesaj);
        }
      });
    }
  }

}

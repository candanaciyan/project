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
  filteredShelves: Shelf[]  = [];
  filterText: string = '';
  role = '';




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
    this.role = this.loginService.getRole();
    
  }
  //boyle de cagirmis olduk


  refreshShelves() {
    this.shelfService.getAllShelves().subscribe({
      next: (data) => {
        this.shelves = data;
        
    this.filteredShelves =data;
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
//               selectedbox icinden  idyi  e   aldik
// kapanan ekrandan da capasity I aldik
// ve son olarak refresh yaptik

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
          this.mainDeleteShelf();
        }
      }
    });
    dialog.componentInstance.called = 'Are you sure for delete this shelf?';

  }
  mainDeleteShelf() {
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
//   burda da silme islemini hakikaten yapacak						
// bu if in icersinde olursa compiler buranin null gelmeyeceginden emin oluyor ve soru isareti gerekmiyor bi alt satirdaki selectbox a						
// null degilse demis olduk yani						
// 			selected box in idsini verdik			
						
// 		cevap dondugunde data olarak alip 				
// 		ekrani guncellemek icin bunu cagirdik				

filterShelves() {
  if (!this.shelves || !this.filterText) {
    this.filteredShelves = this.shelves; // Eğer shelves null ise, filtreleme yapmadan tüm rafları göster
    return;
  }

  const searchText = this.filterText.toLowerCase();
  this.filteredShelves = this.shelves.filter(shelf =>
    shelf.productName && shelf.productName.toLowerCase().includes(searchText)
  );
}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShelfService } from '../../../shared/service/shelf.service';
import { LoginService } from '../../../core/service/login.service';
import { MatDialog } from '@angular/material/dialog';
import { MainDialogueComponent } from '../../../shared/components/main-dialogue/main-dialogue.component';
import { Shelf } from '../../../shared/model/shelf';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-shelf-management',
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})


export class ShelfManagementComponent implements OnInit {
  shelves: Shelf[] = [];
  selectedShelf: Shelf | null = null;
  filteredShelves: Shelf[] = [];
  filterText: string = '';
  role = '';




  constructor(
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private shelfService: ShelfService,
    private loginService: LoginService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.refreshShelves();
    this.role = this.loginService.getRole();

  }
  //boyle de cagirmis olduk


  refreshShelves() {
    this.shelfService.getAllShelves().subscribe({
      next: (data) => {
        this.shelves = data;

        this.filteredShelves = data;
      }
    });
  }

  selectShelf(shelf: Shelf) {
    this.selectedShelf = shelf;
  }

  deleteShelf() {

    let dialog = this.dialog.open(MainDialogueComponent, {
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
      this.shelfService.deleteShelf(this.selectedShelf!.id).subscribe({

        next: () => {
          this.toastr.info('Shelf deleted');
          this.refreshShelves();
        },
        error: () => {
          this.toastr.error("Shelf can't be deleted because it has products");
        }
      });
    }
  }


  filterShelves() {
    if (!this.shelves || !this.filterText) {
      this.filteredShelves = this.shelves; 
      // Eğer shelves null ise, filtreleme yapmadan tüm rafları göster
      return;
    }

    const searchText = this.filterText.toLowerCase();
    //kucuk harfe ceviriyor duyarliligi ayiriyor
    this.filteredShelves = this.shelves.filter(shelf =>
      shelf.productName && shelf.productName.toLowerCase().includes(searchText)
    );
    //dongu kullanarak her raftaki urun isimlerini
    // de küçük harfe çevirip, searchText içerip içermediğini kontrol ediyor. 
  }


  calculateDifference(shelf: Shelf): number {
    return shelf.capacity - shelf.count;
  }

}

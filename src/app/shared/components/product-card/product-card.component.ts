import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product} from '../../model/product';
import { MatDialog } from '@angular/material/dialog';
import { MainDialogueComponent } from '../main-dialogue/main-dialogue.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  //disardan gonderilen parametreleri almasi icin buraya iki tane degisken tanimliyorum
  @Input() product: Product = new Product(0,'',0,'','');
  //yazilimIlan.ts interface ini classa cevirdi. new diyerek instance da yaratmak istedigimiz icin null olmamasi icin
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
//bu called nin  event olarak geriye bir bilgi gondermesi icin bunun  tipinin eventemitter olmasi gerekiyor

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}


  deleteProductButtonClicked() {
    let dialog =  this.dialog.open(MainDialogueComponent, {
//       acmak istedigim comp adini giriyorum open icine 
// mesaj kutusu buyuklugu burda ayarlaniyor

      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data?.result === 'yes') {
          this.deleteProduct();
        }
      }
    });
    dialog.componentInstance.called = 'Are you sure for delete this product?';
  }
  // bu obsv subs metoduyla close yapildiginda su fonksiyon cagrilsin diyebiliyoruz
  // next icinde datayi aliyoruz 
  // data varsa ve result ozelligi yes ise  dedik.data? Yaparak pencere disina tiklandiginda null gelme hatasini onlemis olacak
  // sil bu fruiti demis olduk yukardaki  @Input() fruit: Fruit = new Fruit(0, '', 0, ''); bunu silmis oluyoruz bu degiskendeki
  
  // ama bursai card comp ve bundan dolayi silme islemini  burda yapmayacagiz
  // burdan output ile bir dis compteki yani fruit mang bir fonksiyonu cagiracagiz silme islemini ordan tetikleyecegiz
  // yani burdan service e gitmememiz gerekiyor cunku burasi bizim card componentimiz 
  

//simdi bu metodu tanimlayacagiz kart comp ts icine
deleteProduct() {
  this.delete.emit(this.product);
}
editProduct() {
  this.edit.emit(this.product);
}
//bu event olusturuyor ve bunun mesajini gonderiyor output dedigimiz icin bu componenti kullanan dis componente

}

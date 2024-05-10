import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product} from '../../model/product';
import { MatDialog } from '@angular/material/dialog';
import { MainDialogueComponent } from '../main-dialogue/main-dialogue.component';
import { LoginService } from '../../../core/service/login.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  totalAmount = 0;
  role = '';
  //disardan gonderilen parametreleri almasi icin buraya iki tane degisken tanimliyorum
  @Input() product: Product = new Product(0,'',0,'','',0);
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
//bu called nin  event olarak geriye bir bilgi gondermesi icin bunun  tipinin eventemitter olmasi gerekiyor

  constructor(
   
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.role = this.loginService.getRole();
    this.refreshProducts();
    
  }

  productSelect(product: Product) {
    this.productService.getProductCount(product.id).subscribe({
      next: (data:any) => {
        this.totalAmount = data.count;
        //ve bu sayıyı totalAmount değişkenine atar.
      }
    });
  }
  refreshProducts() {
    this.productService.getAllProducts().subscribe({
      next: (result) => {
        this.products = result;
      }
    });
  }
  deleteProductButtonClicked() {

    let dialog =  this.dialog.open(MainDialogueComponent, {      
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
 


  
deleteProduct() {
  if(this.product.totalAmount > 0) {

    this.toastr.info('Product can not be deleted, because it is in use');

  }else{
    this.delete.emit(this.product);
  }
    
}
editProduct() {
  this.edit.emit(this.product);
}
//bu event olusturuyor ve bunun mesajini gonderiyor output dedigimiz icin bu componenti kullanan dis componente



}

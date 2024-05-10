import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/service/product.service';
import { Product } from '../../../shared/model/product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  currentPage = 1;
  pageSize = 3; 
  totalPages = 0;


  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    
  ) { }
  ngOnInit(): void {
    this.refreshProducts();
  }
  refreshProducts() {
    this.productService.getAllProducts().subscribe({
      next: (result) => {
        this.products = result;//sayfaya yansitacagimiz urunler
        this.allProducts = result;
        //backendden gelen butun urunler
        this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
        this.updateDisplayedProducts();
        //toplam urun / sayfa basi urun sayisi
      }
    });
  }
  updateDisplayedProducts() {
    //all productstan gosterilecek urunler indexi start ve end indexi ile belirleniyor ve
    //js slice metodu ile gosterilecek urunleri aliyoruz
    const startIndex = (this.currentPage - 1) * this.pageSize;//ilk urun index 0-2
    const endIndex = startIndex + this.pageSize;//son urun indexi
    this.products = this.allProducts.slice(startIndex, endIndex);

}

nextPage() {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateDisplayedProducts();
        //sayfa degistiginde gosterilecek 
        //urunler de degistigi icin tekrar bu metodu cagiriyoruz her defasinda
    }
}

previousPage() {
    if (this.currentPage > 1) {
        this.currentPage--;
        this.updateDisplayedProducts();
    }
}

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (data) => {
        this.toastr.info('Product Deleted');
        this.refreshProducts();
      }
    });
  }


  editProduct(product: Product) {
    this.productService.editingProduct = product;
    this.router.navigate(['create'], { relativeTo: this.route });
  }



}


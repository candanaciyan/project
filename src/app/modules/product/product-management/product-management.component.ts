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
  pageSize = 3; // Number of products per page
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
        this.products = result;
        this.allProducts = result;
        this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
        this.updateDisplayedProducts();
      }
    });
  }
  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products = this.allProducts.slice(startIndex, endIndex);
}

nextPage() {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateDisplayedProducts();
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
  // fruiti alacak
  // service icerisini silmek icin id yi ben verecegim burdan geriye 
  // nextten de donen degeri okuyacagim
  // toastr yoktu ekledik const icine
  // bunu cagiriyoruz next icinde
  // bu sayede guncelleme islemi yapiliyor ve ekrandan sildigi belli oluyor
  

  editProduct(product: Product) {
    this.productService.editingProduct = product;
    this.router.navigate(['create'], { relativeTo: this.route });
  }
//   once saklayip sonra da create ekranini acacagiz
// editingfruit icerisine buraya gonderilen fruit objesini sakliyoruz 
// pesinden de yonlendiriyoruz 
//create ekranina gitti



}


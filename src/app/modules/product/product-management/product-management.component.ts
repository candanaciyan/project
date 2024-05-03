import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { ProductService } from '../../../shared/service/product.service';
import { Product } from '../../../shared/model/product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {


  products: Product[] = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private loginService: LoginService,
  ) { }
  ngOnInit(): void {
    this.refreshProducts();
  }
  refreshProducts() {
    this.productService.getAllProducts().subscribe({
      next: (result) => {
        this.products = result;
      }
    });
  }

  cardSelected(message: string) {
    console.log('Kart secildi: ' + message);
  }

  userHasRole(roleName: string): boolean {
    return this.loginService.userHasRole(roleName);
  }

  createProduct() {
    this.router.navigate(['create'], { relativeTo: this.route });
    //router ile o sayfaya yonlendirdi 
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (data) => {
        this.toastr.info('Fruit deleted');
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


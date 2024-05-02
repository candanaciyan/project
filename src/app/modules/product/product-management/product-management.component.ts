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
export class ProductManagementComponent implements OnInit{


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
  refreshProducts(){
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

    editProduct($event: any) {
      throw new Error('Method not implemented.');
      }
      deleteProduct($event: any) {
      throw new Error('Method not implemented.');
      }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/service/product.service';
import { LoginService } from '../../../core/service/login.service';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../shared/model/product';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.scss'
})
export class ProductSaleComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  totalAmount = 0;
  saleform=this.fb.nonNullable.group({
    count: 0,
  });


  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private fb: FormBuilder,
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
productSelect(product: Product) {
  this.selectedProduct = product;
  this.productService.getProductCount(product.id).subscribe({
    next: (data:any) => {
      this.totalAmount = data.count;
    }
  });
}
submit() {
  if (this.selectedProduct) {
    let count = this.saleform.get('count')!.value;
    this.productService.saleProduct(this.selectedProduct.id, count).subscribe({
      next: (result) => {
        if(result.message == "") {
          this.toastr.info('Product sold');
          
        }
        else{
          this.toastr.info(result.message);
        }
        this.router.navigate(['/menu']);
      },
      error: (err)=> {
        this.toastr.error(err.error.message);
      }
    });
  }
}

}
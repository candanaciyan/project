import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { ProductService } from '../../../shared/service/product.service';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../shared/model/product';

@Component({
  selector: 'app-product-accept',
  templateUrl: './product-accept.component.html',
  styleUrl: './product-accept.component.scss'
})
export class ProductAcceptComponent {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  //bu degiskeni tanimladi hem resmini hem ismini saklayabilsin diye 

  acceptForm=this.fb.nonNullable.group({
    count: 0,
  });
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private fb: FormBuilder,
  ) {}
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
  }
 // fruit isteyecegim fruit tipinde
//fruiti alip degiskene aktariyor

  submit() {
    if (this.selectedProduct) {
      let count = this.acceptForm.get('count')!.value;
      this.productService.acceptProduct(this.selectedProduct.id, count).subscribe({
        next: () => {
          this.toastr.info('Product accepted');
          this.router.navigate(['/menu']);
        },
        error: ()=> {
          this.toastr.error("Not Enough Shelf");
        }
      });
    }
  }
//   secili bir fruit varsa  null olup olmadigi kontrolunu if in icinde yaziyoruz
// countu alacagim baska bir seye ihtiyacim yok
// fruitserviceten accept isminde metot cagiracagim  fruitin id sini ve countu verecegiz

// mesaji verip
// menuye donuyoruz

// hata alirsam ise
// burda ozel hata mesaji verecegiz

  
}

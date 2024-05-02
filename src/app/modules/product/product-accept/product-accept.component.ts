import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { ProductService } from '../../../shared/service/product.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-accept',
  templateUrl: './product-accept.component.html',
  styleUrl: './product-accept.component.scss'
})
export class ProductAcceptComponent {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  acceptForm=this.fb.nonNullable.group({
    count: 0,
  });
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private loginService: LoginService,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.refreshFruits();
  }
  refreshFruits() {
    this.fruitService.getAllFruits().subscribe({
      next: (result) => {
        this.fruits = result;
      }
    });
  }
  fruitSelect(fruit: Fruit) {
    this.selectedFruit = fruit;
  }
  submit() {
    if (this.selectedFruit) {
      let count = this.form.get('count')!.value;
      this.fruitService.accept(this.selectedFruit.id, count).subscribe({
        next: (result) => {
          this.toastr.info('Fruit accepted');
          this.router.navigate(['/menu']);
        },
        error: (err)=> {
          this.toastr.error(err.error.mesaj);
        }
      });
    }
  }
  
}

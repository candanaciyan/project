import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { ProductService } from '../../../shared/service/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IMAGES } from '../../../shared/model/images';
import { Product } from '../../../shared/model/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  productForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    minimum: [0, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required], 
    image: '',
  });
  
  productId = 0;
  selectedImage = '';

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private fb: FormBuilder,
  ) { }

  submit() {
    if (this.productForm.invalid) {
      this.toastr.error('Please fill out the form correctly.');
      return;
    }

    let name = this.productForm.get('name')!.value;
    let minimum = this.productForm.get('minimum')!.value;
    let description = this.productForm.get('description')!.value;
    let image = this.selectedImage;

    this.productService.createProduct(new Product(this.productId, name, minimum, description, image, 0)).subscribe({
      next: (resp) => {
        this.toastr.success('Product saved.');
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Product Error Occurred.");
      }
    });
  }

  ngOnInit(): void {
    if (this.productService.editingProduct != null) {
      this.productId = this.productService.editingProduct.id;
      this.productForm.patchValue({
        name: this.productService.editingProduct.name,
        minimum: this.productService.editingProduct.minimum,
        description: this.productService.editingProduct.description,
        image: this.productService.editingProduct.image
      });
      this.selectedImage = this.productService.editingProduct.image;
      this.productService.editingProduct = null;
    }
  }

  imageSelect(image: string) {
    this.selectedImage = image;
    this.productForm.get('image')!.setValue(image);
  }

  getProducts() {
    return IMAGES;
  }
}
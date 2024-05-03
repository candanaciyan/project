import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { ProductService } from '../../../shared/service/product.service';
import { FormBuilder } from '@angular/forms';
import { IMAGES } from '../../../shared/model/images';
import { Product } from '../../../shared/model/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {
  productForm = this.fb.nonNullable.group({
    name: '',
    quantity: 0,
    minimum: 0,
    description: '',
    });
    selectedImage = '';
    productId = 0;
//     buraya selected image gibi formun disinda saklayacagim id degiskeni olusturduk 
// id 0 sa yaratma modunda calisiyor create fruit  degilse guncelleme modunda aciyor id ye bakip


  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private loginService: LoginService,
    private fb: FormBuilder,
  ) { }

  submit() {
    let name = this.productForm.get('name')!.value;
    let quantity = this.productForm.get('quantity')!.value;
    let minimum = this.productForm.get('minimum')!.value;
    let description = this.productForm.get('description')!.value;
    this.productService.createProduct(new Product(this.productId, name,quantity,minimum,description, this.selectedImage)).subscribe({

      next: (resp) => {
        this.toastr.success('Product Oluşturulmuştur');
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Hata oluştu");
      }
    });
  }
  // submit() {
  //   let name = this.productForm.get('name')!.value;
  //   let minimum = this.productForm.get('minimum')!.value;
  //   this.productService.createProduct(new Product(this.productId, name, minimum, this.selectedImage)).subscribe({
  //     next: (result) => {
  //       this.toastr.info('Product created.');
  //       this.router.navigate(['..'], { relativeTo: this.route });
  //     }
  //   });
  // }


  ngOnInit(): void {
    if (this.productService.editingProduct != null) {
      // edit mode
      this.productId = this.productService.editingProduct.id;
      this.productForm.patchValue(
        { name: this.productService.editingProduct.name, minimum: this.productService.editingProduct.minimum, 
        });
      this.selectedImage = this.productService.editingProduct.image;
      this.productService.editingProduct = null;
    } else {
      // create mode
    }
  }
  // eger null degilse
  // o zaman edit mode ta acmisizdir
  // benim artik degisiklik yapacagim icin id ye de ihtiyacim var//bu fruitid nin degeri degistirecegimiz fruitin idsi olacak
  // formumuzun degerini veriyoruz ama verirken tum degerlerini vermemiz gerekiyor 
  // name ve minimumu vermek gerekiyor yani eger sadece birini vermek istiyorsan cagiracagimiz fonksiyon setValue degil 
  // patchValue olacak bunu daha once gostermisti
  // buraya json formatinda bilgileri yaziyoruz simdi 
  // editingfruit icindeki objenin degerlerini yazacagiz 
  // img degeri de id gibi ayni sekilde olacak
//   id 0 sa create oluyor eger degilse o zaman edite geciyor ve guncelliyor
// bu mantikla yazdi
// ismini minimumu degistirebildim resmini de degistirebildim boylece
// denedik sorun olmadi

  

  imageSelect(image: string) {
    this.selectedImage = image;
  }

  getProducts() {
    return IMAGES;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: any[] = []
  categories: any[] = []
  base64: any = ''
  newProductForm!: FormGroup

  constructor(private productService: ProductsService, private builder: FormBuilder) {

  }
  ngOnInit(): void {

    this.newProductForm = this.builder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    })


    this.getAllProducts()
    this.getAllCategories()
  }


  getAllProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res
    })
  }

  getAllCategories() {
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res
    })
  }

  getSelectedValue(event: any) {
    this.newProductForm.patchValue({ category: event.target.value })
  }

  getImagePath(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.newProductForm.patchValue({ image: this.base64 })
    };
  }

  addNewProduct() {
    this.productService.createProduct(this.newProductForm.value).subscribe((res: any) => {
      alert('Product added succesfuly !!')
    }, error => {
      alert(error.message)

    })
  }

}

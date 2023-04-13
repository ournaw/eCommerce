import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: any[] = []
  categories: any[] = []
  loading: boolean = false

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts() {
    this.loading = true
    this.service.getProducts().subscribe((res: any) => {
      this.products = res
      this.loading = false
    }, error => {
      alert(error.message)
      this.loading = false
    })
  }

  getProductsByCategory(category: any) {
    this.loading = true
    this.service.getProductsByCategory(category).subscribe((res: any) => {
      this.products = res
      this.loading = false
    }, error => {
      alert(error.message)
      this.loading = false
    })
  }

  getCategories() {
    this.service.getCategories().subscribe((res: any) => {
      this.categories = res
    }, error => {
      alert(error.message)
    })
  }

  filterByCategory(event: any) {
    if (event.target.value == "all")
      this.getProducts()
    else
      this.getProductsByCategory(event.target.value)
  }

}

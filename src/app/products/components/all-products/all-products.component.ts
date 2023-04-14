import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: product[] = []
  categories: any[] = []
  loading: boolean = false
  cart: any[] = []

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

  addToCart(event: any) {

    if ("Cart" in localStorage) {
      this.cart = JSON.parse(localStorage.getItem('Cart')!)
      let exist: Boolean = this.cart.find(item => item.product.id == event.product.id)
      if (exist) {
        alert('Product already exist in cart')
      } else {
        this.cart.push(event)
        localStorage.setItem('Cart', JSON.stringify(this.cart))
      }
    } else {
      this.cart.push(event)
      localStorage.setItem('Cart', JSON.stringify(this.cart))
    }

  }

}

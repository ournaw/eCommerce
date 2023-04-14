import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart!: any
  total: number = 0

  constructor(private service: CartsService) {

  }

  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts() {
    if ("Cart" in localStorage) {
      this.cart = JSON.parse(localStorage.getItem('Cart')!)
    }
    this.totalPrice()
  }

  setCartProducts() {
    localStorage.setItem('Cart', JSON.stringify(this.cart))
  }

  totalPrice() {
    this.total = 0
    for (let i in this.cart)
      this.total += this.cart[i].product.price * this.cart[i].quantity;
  }

  onMin(i: any) {
    this.cart[i].quantity--;
    this.totalPrice()
    this.setCartProducts()
  }

  onMax(i: any) {
    this.cart[i].quantity++;
    this.totalPrice()
    this.setCartProducts()
  }

  onChangeQuantity(i: any, event: any) {
    this.cart[i].quantity = event.target.value;
    this.totalPrice()
    this.setCartProducts()
  }

  onDelete(i: any) {
    this.cart.splice(i, 1)
    this.totalPrice()
    this.setCartProducts()
  }

  onClearCart() {
    this.cart = []
    this.totalPrice()
    this.setCartProducts()
  }

  addCart() {
    let products = this.cart.map((item: any) => {
      return ({ productId: item.product.id, quantity: item.quantity })
    })
    let model = {
      userId: 5,
      date: new Date,
      products: products
    }

    this.service.addNewCart(model).subscribe((res: any) => {
      alert('Cart has added sucessfuly')
      this.onClearCart()
    })

  }
}

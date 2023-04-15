import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';
import { product } from 'src/app/products/models/product';

@Component({
  selector: 'app-all-carts',
  templateUrl: './all-carts.component.html',
  styleUrls: ['./all-carts.component.scss']
})
export class AllCartsComponent implements OnInit {

  carts: any[] = []
  viewCart: any = {}
  total: number = 0
  dateForm!: FormGroup

  constructor(private adminService: AdminService, private productService: ProductsService, private builder: FormBuilder) {
    this.dateForm = this.builder.group({
      start: [''],
      end: ['']
    })
  }

  ngOnInit(): void {
    this.getAllCarts()
  }

  getAllCarts() {
    this.adminService.getAllCarts().subscribe((res: any) => {
      this.carts = res
    })
  }

  applyFilter() {
    let params = this.dateForm.value
    this.adminService.getAllCarts(params).subscribe((res: any) => {
      this.carts = res
    })
  }

  deleteCart(id: any) {
    this.adminService.deleteCart(id).subscribe(res => {
      console.log(res)
    })
  }

  getCart(cart: any) {

    this.total = 0

    this.viewCart = {
      id: cart.id,
      userId: cart.userId,
      date: cart.date,
      products: []
    }

    for (let i = 0; i < cart.products.length; i++) {

      const id = cart.products[i].productId
      const quantity = cart.products[i].quantity

      this.productService.getProductById(id).subscribe((res: any) => {
        this.viewCart.products.push({ product: res, quantity: quantity })
        this.total += res.price * quantity
      })
    }

  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() itemIn: any = {}
  @Output() itemOut = new EventEmitter()
  quantity: number = 0
  addButton: boolean = false


  addToCart() {
    this.itemOut.emit({ product: this.itemIn, quantity: this.quantity })
  }


}

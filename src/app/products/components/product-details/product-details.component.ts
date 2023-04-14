import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id!: number
  loading = false
  product: any

  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = +route.snapshot.paramMap.get('id')!
    console.log(this.id)
  }
  ngOnInit(): void {
    this.getProduct()
  }


  getProduct() {
    this.loading = true
    this.service.getProductById(this.id).subscribe(res => {
      this.product = res
      this.loading = false
    }, error => {
      alert(error.message)
      this.loading = false
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-carts',
  templateUrl: './all-carts.component.html',
  styleUrls: ['./all-carts.component.scss']
})
export class AllCartsComponent implements OnInit {

  carts: any[] = []
  dateForm!: FormGroup

  constructor(private service: AdminService, private builder: FormBuilder) {
    this.dateForm = this.builder.group({
      start: [''],
      end: ['']
    })
  }

  ngOnInit(): void {
    this.getAllCarts()
  }

  getAllCarts() {
    this.service.getAllCarts().subscribe((res: any) => {
      this.carts = res
    })
  }

  applyFilter() {
    let params = this.dateForm.value
    this.service.getAllCarts(params).subscribe((res: any) => {
      this.carts = res
    })
  }

}

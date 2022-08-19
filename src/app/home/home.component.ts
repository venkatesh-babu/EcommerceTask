import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public productList: any = [];
  products: any;
  name: any;
  count: any = 1;
  visible: boolean = false;
  constructor(
    public httpClient: HttpClient,
    private route: Router,
    private cartService: CartService
  ) { }
  ngOnInit(): void {
    let data = this.httpClient.get('https://fakestoreapi.com/products');
    data.subscribe((response) => {
      this.products = response
    });
  }
  MoveToCart(product: any) {
    this.visible = true;
    this.cartService.addtoCart(product);
  }
  close() {
    this.visible = false;
  }
}

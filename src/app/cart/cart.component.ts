import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product: any;
  productid: any;
  public grandtotal: any;
  constructor(
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe((response) => {
        this.product = response;
      });
    var cartData = this.cartService.cartItemList;
    this.grandtotal = 0;
    for (let i = 0; i < cartData.length; i++) {
      this.grandtotal += cartData[i].price;
    }
  }

  increment(item: any, count: any) {
    var id = item.id;
    var intialData = this.cartService.initialValue;
    for (let i = 0; i < intialData.length; i++) {
      if (intialData[i].productId == id) {
        var initialval = intialData[i].initialPrice;
      }
    }
    var val = initialval * count.target.value;
    this.cartService.updateCart(item, val, id);
    this.cartService.getProducts();
    var cartData = this.cartService.cartItemList;
    this.grandtotal = 0;
    for (let i = 0; i < cartData.length; i++) {
      console.log(cartData[i].price);
      this.grandtotal += cartData[i].price;
    }
  }
  deleteItem(item: any) {
    this.cartService.deletCart(item);
    this.cartService.getProducts()
      .subscribe((response) => {
        this.product = response;
        var total = 0;
        for (let item in response) {
          total += parseInt(response[item].price);
        }
        this.grandtotal = total;
      });
  }
}

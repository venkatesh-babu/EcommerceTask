import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  product: any;
  public grandtotal: any;
  visible: boolean = false;
  constructor(private cartService: CartService) {

  }

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
  show() {
    this.visible = true;
  }
  close() {
    this.visible = false;
  }
}

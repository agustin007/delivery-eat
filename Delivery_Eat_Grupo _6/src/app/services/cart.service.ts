import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import ShippingPrice from 'src/app/models/shipping_price.model';
import { ShippingPriceService } from 'src/app/services/shipping_price.service';
import { map } from 'rxjs/operators';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  shop;
  volume:number = 0;
  shipping_prices = [];

  constructor(
    private http: HttpClient,
    private spService: ShippingPriceService
  ) {

    this.getShippingPrices();
  }

  addToCart(product) {
    this.items.push(product);
    this.volume += parseInt(product.volume);
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    var total = 0;
    this.items.forEach(i => total += i.price  )
    return total;
  }

  getCurrentVolume() {
    return this.volume;
  }

  clearCart() {
    this.items = [];
    this.shop = null;
    this.volume = 0;
    return this.items;
  }

  getShippingPrices() {
    return this.retrieveShippingPrices();
  }

  setSelectedShop(shop){
    this.shop=shop;
  }
  getSelectedShop(){
    return this.shop;
  }


  retrieveShippingPrices(): void {
    this.spService.getAll().snapshotChanges().pipe(
      map((changes) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
      ).subscribe((data) => {
      this.shipping_prices = data;
    });
  }

  resetVolume(){
    this.volume = 0;
  }

  resetItemsCart(){
    this.items = [];
  }

}

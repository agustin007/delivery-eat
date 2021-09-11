import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Shop from 'src/app/models/shop.model';
import { ShopService } from 'src/app/services/shop.service';
import { map } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-selection',
  templateUrl: './shop-selection.component.html',
  styleUrls: ['./shop-selection.component.css']
})
export class ShopSelectionComponent implements OnInit {

  shops?: Shop[];
  opcion:string;
  
  constructor(private route: ActivatedRoute,
            private cartService: CartService,
            public shopService: ShopService,
            public router: Router,
            private snackBar: MatSnackBar) { }

  ngOnInit(): void {    
    this.retrieveProducts();
    this.opcion = 'Consult';
  }

  onSubmit(shopsForm:NgForm){
    this.shopService.create(shopsForm.value);    
    this.snackBar.open('Registration was successfully registred.')
    shopsForm.reset();
    this.opcion = 'Consult';
  }

  shopSelected(shopSelected) {
    if(this.cartService.getSelectedShop() == null || this.cartService.getSelectedShop() == undefined){
    this.cartService.setSelectedShop(shopSelected);
    this.router.navigate( ['/products']);
    }
    else{
      var items = this.cartService.getItems().length;
      var selectedShop = this.cartService.getSelectedShop().id;
      if(shopSelected.id != this.cartService.getSelectedShop().id && this.cartService.getItems().length > 0){
        window.alert('Your selected shop is ' + this.cartService.getSelectedShop().name + ", You are unable to add other shop items to cart");
      }else{
        this.router.navigate( ['/products']);
      }
    }
    
  }

  retrieveShops(){
    this.opcion = 'Consult';
  }

  addShop(){
    this.opcion = 'Add';
  }

  retrieveProducts(): void {
    this.shopService.getAll().snapshotChanges().pipe(
      map((changes) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
      ).subscribe((data) => {
      this.shops = data;
      var lastShop = this.shops[this.shops.length - 1];
      this.shopService.shopSelected.id = (parseInt(lastShop.id) + 1).toString();
    });
  }

}

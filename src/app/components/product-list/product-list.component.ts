import { Component, OnInit } from '@angular/core';

import Product from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { MethodPaymentsService } from 'src/app/services/method_payment.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  {
  
  products?: Product[];
  opcion:string;
  
  constructor(
    public cartService: CartService,
    public productService: ProductService,
    private snackBar: MatSnackBar,
    private cityService: CityService,
    private payMethodService: MethodPaymentsService,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.opcion = 'Consult';
    this.retrieveProducts();
  }

  onSubmit(productsForm:NgForm){
    this.productService.create(productsForm.value);    
    this.snackBar.open('Registration was successfully registred.')
    productsForm.reset();
    this.opcion = 'Consult';
  }

  // onSubmitCity(cityForm:NgForm){
  //   this.payMethodService.create(cityForm.value);
  //   cityForm.reset();
  // }

  retrieveProducts(): void {
    var shopId = ((this.cartService.getSelectedShop()!= null) ? this.cartService.getSelectedShop().id : 0);;

    this.productService.getAll().snapshotChanges().pipe(
      map((changes) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ).filter(c => c.shop == shopId)
      )
      ).subscribe((data) => {
      this.products = data;
      var items:Product[]  = this.cartService.getItems();

      if(items.length >= 0){
        items.forEach(item =>{
          this.products.forEach(product =>{
            if(item.id == product.id){
              this.products.splice(parseInt(product.id)-1, 1);
            }
          })
        })
      }  
    });
    console.log(this.products);
  }


  addToCart(product: Product) {
    var totalVolume = Number.parseInt(this.cartService.getCurrentVolume().toString()) + Number.parseInt(product.volume.toString());
    if( totalVolume >= 100) {
      window.alert("Delivery Backpack is on %"+this.cartService.getCurrentVolume()+" of its capacity! This item can't be added! Nevertheless, you can pick smaller products.");
    }
    else {
      this.cartService.addToCart(product);
      var index = 0;
      for (var i = 1; i < this.products.length; i++) {
        if(product.id == this.products[i].id){
          index = i;
        }
      }
      this.products.splice(index, 1);
      window.alert('Your product has been added to the cart!');
    }
  }

  showProducts(){
    this.opcion = 'Consult';
    this.retrieveProducts();
  }

  addProduct(){
    this.opcion = 'Add';
  }

  back(){
    if (window.confirm("Lost the changes maked, ¿Desea continuar?")) {
      this.cartService.resetVolume();
      this.cartService.resetItemsCart();
      this.location.back();
    }
  }
}

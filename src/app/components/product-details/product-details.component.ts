import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Product from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';




import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
 
  product;
  products: Product[];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');

   // Find the product that correspond with the id provided in route.
   this.retrieveProducts(productIdFromRoute);
   
  }
  
  addToCart(product) {
    if(this.cartService.getCurrentVolume() + product.volume >= 100){
      window.alert("Delivery Backpack is on %"+this.cartService.getCurrentVolume()+" of its capacity! This item can't be added! Nevertheless, you can pick smaller products.");
      console.log(this.cartService.getCurrentVolume());
    }else{
      this.cartService.addToCart(product);
      window.alert('Your product has been added to the cart!');
    }
    
  }



  retrieveProducts(idProduc: string): void {
    this.productService.getAll().snapshotChanges().pipe(
      map( p =>
        p.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ).filter(c => c.id == idProduc)
      )
      ).subscribe((data) => {
        console.log(data);
      this.product = data[0];
    });
  }

}

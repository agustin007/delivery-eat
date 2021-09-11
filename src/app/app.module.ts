import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ShopSelectionComponent } from './components/shop-selection/shop-selection.component';
import { FormPucharseComponent } from './components/form-pucharse/form-pucharse.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms'

import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: 'shops', component: ShopSelectionComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'confirmation', component: FormPucharseComponent },
    ]),
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    FormsModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    ShopSelectionComponent,
    FormPucharseComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

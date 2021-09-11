import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

import { CartService } from '../../services/cart.service';

import { map } from 'rxjs/operators';
import City from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import Order from '../../models/order.model';
import { OrderService } from 'src/app/services/order.service';
import MethodPayments from 'src/app/models/method_payment.model';
import { MethodPaymentsService } from 'src/app/services/method_payment.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  order: Order = new Order();
  items = this.cartService.getItems();
  
  cities?: City[];
  method_payments?: MethodPayments[];
  shippingCosts = this.cartService.shipping_prices;

  paymentMethod;
  shippingDateForm;


  formControlStreet = new FormControl(this.order.address.street, [Validators.required, 
                                                                  Validators.maxLength(255),
                                                                  Validators.pattern(/^[#.0-9a-zA-Z\s,-]+$/)]);

  formControlNumber = new FormControl(this.order.address.number, [Validators.required,
                                                                  Validators.maxLength(10),
                                                                  Validators.pattern(/\d*/)]);   
                                                                  
                                                                  
  formControlOptionalAddress = new FormControl(this.order.address.reference, [Validators.maxLength(255)]);   
  
  formControlCity = new FormControl(this.order.address.city.name, [Validators.required]);

  
  
  formControlAmountToPay = new FormControl(this.order.amount_to_pay,[ Validators.required, Validators.maxLength(12)]);

  formControlCCNumber = new FormControl('', [Validators.pattern(/[4]{1}[0-9]{3}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}$/),
                                             Validators.required]);

  formControlCardHolderName = new FormControl('', [Validators.minLength(3),
                                                   Validators.maxLength(26),
                                                   Validators.required]);

  formControlDueDate = new FormControl('', [Validators.pattern(/(0?[1-9]|1[0-2])\/(\d{4})/),
                                            Validators.required]);
  formControlCVC = new FormControl('', [Validators.minLength(3),
                                        Validators.maxLength(26),
                                        Validators.required]);
  formControlShippingDate = new FormControl(this.order.shipping_date);
 
  

  form = new FormGroup({
    city: this.formControlCity,
    number: this.formControlNumber,
    street: this.formControlStreet,
    ccnumber: this.formControlCCNumber,
    ccholdername: this.formControlCardHolderName ,
    dueDate: this.formControlDueDate,
    cvc : this.formControlCVC,      
    shippingDate : this.formControlShippingDate,
    amountToPay : this.formControlAmountToPay,
    optionalAddress : this.formControlOptionalAddress
  });


  constructor(
    public cartService: CartService,
    private citiesService: CityService,
    private method_paymentsService: MethodPaymentsService,
    private orderService: OrderService,
    public router: Router,
    private location: Location,
    ){}

  ngOnInit(): void {
    this.retrieveCities();
    this.retrieveMethodPayments();
  }
  
  retrieveCities(): void {
    this.citiesService.getAll().snapshotChanges().pipe(
      map((changes) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
      ).subscribe((data) => {
      this.cities = data;
    });
  }

  

  retrieveMethodPayments(): void {
    this.method_paymentsService.getAll().snapshotChanges().pipe(
      map((changes) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
      ).subscribe((data) => {
      this.method_payments = data;
    });
  }

  getTotal(): any {
    let result = 0;
    result += this.cartService.getTotal();
    if(result!=0){
      this.shippingCosts.forEach(element => {
        result += element.price;
      });
    }
    return result;
  }

  setNumber(index){
    this.paymentMethod = index;
    //Remove controls if Cash on delivery selected.Otherwise, add controls .
    if(index==1){
      this.form.removeControl('ccnumber');
      this.form.removeControl('ccholdername');
      this.form.removeControl('dueDate');
      this.form.removeControl('cvc');
      this.form.addControl('amountToPay',this.formControlAmountToPay);

    }
    if(index==0){
      this.form.addControl('ccnumber',this.formControlCCNumber);
      this.form.addControl('ccholdername',this.formControlCardHolderName);
      this.form.addControl('dueDate',this.formControlDueDate);
      this.form.addControl('cvc',this.formControlCVC);

      this.form.removeControl('amountToPay');
    }
  }

  validateExpiry (input) {
    // ensure basic format is correct
    if (input.match(/^(0\d|1[0-2])\/\d{2}$/)) {
      const {0: month, 1: year} = input.split("/");
  
      // get midnight of first day of the next month
      const expiry = new Date(Number("20")+year, month);
      const current = new Date();
     
      return expiry.getTime() > current.getTime();
      
    } else return false;
  }

  definedDate(value){
    console.log(value);
    this.shippingDateForm = value;
    if(value == 0){
      this.form.removeControl('shippingDate');
    }
    if(value == 1){
      this.form.addControl('shippingDate',new FormControl(this.order.shipping_date, [Validators.required]));
    }
  }

  get city(): any {
    return this.form.get('city');
  }

  get street(): any {
    return this.form.get('street');
  }
  get number(): any {
    return this.form.get('number');
  }

  get ccnumber(): any {
    return this.form.get('ccnumber');
  }

  get ccholdername(): any {
    return this.form.get('ccholdername');
  }
  get dueDate(): any {
    return this.form.get('dueDate');
  }
  get cvc(): any {
    return this.form.get('cvc');
  }
  get shippingDate(): any {
    return this.form.get('shippingDate');
  }
  get amountToPay(): any {
    return this.form.get('amountToPay');
  }
  get optionalAddress(): any {
    return this.form.get('optionalAddress');
  }

  
  onSubmit(): void {
    // Process checkout data here
    
    if(this.getTotal() <= 0){
      window.alert('Your order has no items on cart');
    }else{

    this.getOrder();

    this.orderService.create(this.order).then(() => {
    this.clean();
    this.router.navigate( ['/confirmation']);
    });
    }
  }

  clean(){
    console.log('Created new item successfully!');
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.form.value);
    this.form.reset();
  }

  getOrder(){
    this.order.address.city = this.form.get('city').value;
    this.order.address.street = this.form.get('street').value;
    this.order.address.number = this.form.get('number').value;
    this.order.address.reference = this.form.get('optionalAddress').value;
    this.order.amount_to_pay = (this.form.get('amountToPay') == null ? null : this.form.get('amountToPay').value);
    this.order.shipping_date = this.form.get('shippingDate') == null ? null : this.form.get('shippingDate').value;
    this.order.products = this.items;
    this.order.shop = this.cartService.getSelectedShop();
    this.order.total = this.getTotal();
  }

  back(){
    this.location.back();
  }

}



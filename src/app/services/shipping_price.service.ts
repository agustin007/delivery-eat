import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import ShippingPrice from '../models/shipping_price.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingPriceService {

  private dbPath = '/shipping_prices';

  spRef: AngularFireList<ShippingPrice>;

  constructor(private db: AngularFireDatabase) {
    this.spRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<ShippingPrice> {
    return this.spRef;
  }

  create(s: ShippingPrice): any {
    return this.spRef.push(s);
  }

  update(key: string, value: any): Promise<void> {
    return this.spRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.spRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.spRef.remove();
  }
}

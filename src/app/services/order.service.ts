import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Order from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private dbPath = '/orders';

  ordersRef: AngularFireList<Order>;

  constructor(private db: AngularFireDatabase) {
    this.ordersRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Order> {
    return this.ordersRef;
  }

  create(order: Order): any {
    return this.ordersRef.push(order);
  }

  update(key: string, value: any): Promise<void> {
    return this.ordersRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.ordersRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.ordersRef.remove();
  }
}

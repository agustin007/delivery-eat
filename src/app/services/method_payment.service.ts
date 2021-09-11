import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import MethodPayment from '../models/method_payment.model';

@Injectable({
  providedIn: 'root'
})
export class MethodPaymentsService {

  private dbPath = '/method_payments';

  methodPaymentsRef: AngularFireList<MethodPayment>;

  constructor(private db: AngularFireDatabase) {
    this.methodPaymentsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<MethodPayment> {
    return this.methodPaymentsRef;
  }

  create(method_payment: MethodPayment): any {
    return this.methodPaymentsRef.push(method_payment);
  }

  update(key: string, value: any): Promise<void> {
    return this.methodPaymentsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.methodPaymentsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.methodPaymentsRef.remove();
  }
}

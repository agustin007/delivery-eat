import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Shop from '../models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private dbPath = '/shop';

  shopsRef: AngularFireList<Shop>;
  shopSelected: Shop = new Shop();

  constructor(private db: AngularFireDatabase) {
    this.shopsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Shop> {
    return this.shopsRef;
  }

  create(s: Shop): any {
    return this.shopsRef.push(s);
  }

  update(key: string, value: any): Promise<void> {
    return this.shopsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.shopsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.shopsRef.remove();
  }
}

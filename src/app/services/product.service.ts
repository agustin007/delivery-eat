import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import Product from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath = '/products';

  productsRef: AngularFireList<Product>;

  // productRef: AngularFireObject<Product>;

  productSelected: Product = new Product();

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }



  getAll(): AngularFireList<Product> {
    return this.productsRef;
  }

  create(p: Product): any {
    return this.productsRef.push(p);
  }

  update(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.productsRef.remove();

  }
}

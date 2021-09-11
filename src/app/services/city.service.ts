import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import City from '../models/city.model';
import MethodPayment from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private dbPath = '/cities';

  citiesRef: AngularFireList<MethodPayment>;

  constructor(private db: AngularFireDatabase) {
    this.citiesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<MethodPayment> {
    return this.citiesRef;
  }

  create(city: City): any {
    return this.citiesRef.push(city);
  }

  update(key: string, value: any): Promise<void> {
    return this.citiesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.citiesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.citiesRef.remove();
  }
}

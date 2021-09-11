import City from "./city.model";

export default class Address {
    street?: string;
    number?: number;
    city = new City;
    reference?: string;
  }
  
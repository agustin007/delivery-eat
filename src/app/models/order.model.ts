import Address from "./address.model";
import CreditCard from "./creditcard.model";


export default class Order {
  key?: string | null;
  address? = new Address;
  method_payment?: string;
  creditcard? = new CreditCard;
  shipping_date?: string; // null is "as soon as possible"
  amount_to_pay?:number;
  products?: any;
  shop?: string;  
  total?: string;
}

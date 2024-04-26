export interface Product {
  id: number;
  product_location: string;
  product_name: string;
  product_price : number;
  product_quantity: number;
}


export interface ProductCreateEditInterface {

  name: string;
  price: number;
  quantity: number;
  location: string;

}



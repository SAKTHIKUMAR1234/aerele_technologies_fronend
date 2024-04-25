import { makeObservable, action, observable } from "mobx";
import { instance, product_data_fecth_url } from "../types/GlobalConfig";
import Product from "../types/ProductInterface";

class ProductStore {
  products : Product[] | []  = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      fetchProducts: action,
    });
  }

  async fetchProducts(query : string) {
    try {
      const response = await instance.post(product_data_fecth_url,{
        'product_query' : query
      });
      this.products = response.data.data
      return {
        status : true,
        data :response.data.data
      }
    } catch (error) {
      return {
        status: false,
        data: {
          title: 'Error',
          text: 'An error occurred during signup',
          icon: 'error',
          confirmButtonText: 'OK'
        }
      }
    }
  }

  setProducts(values : Product[]){
    this.products = values
  }
}

const productStore = new ProductStore();
export default productStore;

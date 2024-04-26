import { makeObservable, action, observable } from "mobx";
import { instance, product_creation_url, product_data_fecth_url, product_delete_url, product_update_url } from "../types/GlobalConfig";
import { Product, ProductCreateEditInterface } from "../types/ProductInterface";

class ProductStore {
  products: Product[] | [] = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      fetchProducts: action,
      setProducts: action,
      deleteProduct: action
    });
  }

  async fetchProducts(query: string) {
    try {
      const response = await instance.post(product_data_fecth_url, {
        'product_query': query
      });
      this.setProducts(response.data.data)
      return {
        status: true,
        data: response.data.data
      }
    } catch (error) {
      return {
        status: false,
        data: {
          title: 'Error',
          text: 'An error occurred',
          icon: 'error',
          confirmButtonText: 'OK'
        }
      }
    }
  }

  async updateProduct(product_id: number, product: ProductCreateEditInterface) {
    try {
      await instance.put(`${product_update_url}/${product_id}`, {
        "product_name": product.name,
        "product_quantity": product.quantity,
        "product_price": product.price,
        "product_location_id": product.location
      })
      return {
        status: true,
        data: {
          title: 'Product Updated',
          text: 'The Product Updated Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }
      }
    }
    catch (error: any) {
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

  async createProducts(product: ProductCreateEditInterface) {
    try {
      await instance.post(product_creation_url, {
        "product_name": product.name,
        "product_quantity": product.quantity,
        "product_price": product.price,
        "product_location_id": product.location
      })
      return {
        status: true,
        data: {
          title: 'Product Created',
          text: 'The Product Created Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }
      }
    } catch (error: any) {
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

  async deleteProduct(product_id: number) {
    try {
      await instance.delete(`${product_delete_url}/${product_id}`)
      return{
        status : true,
        data: {
          title: 'Product Deleted',
          text: 'The Given Product is Deleted',
          icon: 'success',
          confirmButtonText: 'OK'
        }
      }
    }
    catch (error: any) {
      if (error.response && error.response.status === 404) {
        return {
          status: false,
          data: {
            title: 'Product Not Found',
            text: 'The Product With Given Deltails Not Found',
            icon: 'info',
            confirmButtonText: 'OK'
          }
        };
      }
      else {
        return {
          status: false,
          data: {
            title: 'Error',
            text: 'An error occurred during signup',
            icon: 'error',
            confirmButtonText: 'OK'
          }
        };
      }
    }
  }

  setProducts(values: Product[]) {
    this.products = values
  }
}

const productStore = new ProductStore();
export default productStore;

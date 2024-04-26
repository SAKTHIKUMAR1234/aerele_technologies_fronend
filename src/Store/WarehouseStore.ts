import { makeObservable, action, observable } from "mobx";
import { warehouse_create_url, warehouse_data_fetch_url, warehouse_update_url } from "../types/GlobalConfig";
import { instance } from "../types/GlobalConfig";
import Location from "../types/WarehouseInterface";

class WarehouseStore {
  search_query: string = ''
  locations: Location[] | [] = []
  constructor() {
    makeObservable(this, {
      search_query: observable,
      setSearchQuery: action,
      makeFetchData: action,
      createWarehouse: action,
      updateWareHouse: action
    });
  }
  setSearchQuery(value: string) {
    this.search_query = value
  }

  async makeFetchData() {
    try {
      const response = await instance.post(warehouse_data_fetch_url, { 'search_query': this.search_query })
      this.locations = response.data.data
      return {
        status: true,
        data: this.locations
      }
    }
    catch (error) {
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

  async createWarehouse(warehouseName: string) {
    try {
      await instance.post(`${warehouse_create_url}/${warehouseName}`, {});
      return {
        status: true,
        data: {
          title: 'Warehouse Created',
          text: 'The Warehouse is created',
          icon: 'success',
          confirmButtonText: 'OK'
        }
      };
    }
    catch (error: any) {
      if (error.response && error.response.status === 409) {
        return {
          status: false,
          data: {
            title: 'Already Exist',
            text: 'The warehouse name already exist',
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
            text: 'An error occurred',
            icon: 'error',
            confirmButtonText: 'OK'
          }
        };
      }
    }
  }

  async updateWareHouse(id: number, location_name: string) {
    try {
      await instance.put(`${warehouse_update_url}/${id}/${location_name}`)
      return {
        status: true,
        data: {
          title: 'Warehouse Updated',
          text: 'The Warehouse is Updated',
          icon: 'success',
          confirmButtonText: 'OK'
        }
      };

    }
    catch (error: any) {
      if (error.response && error.response.status === 409) {
        return {
          status: false,
          data: {
            title: 'Already Exist',
            text: 'The warehouse name already exist',
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
}

const warehouseStore = new WarehouseStore();
export default warehouseStore;
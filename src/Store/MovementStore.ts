import { action, makeObservable, observable } from "mobx";
import MovementInterface from "../types/MovementInterface";
import { instance, movement_fetch_url } from "../types/GlobalConfig";


class MovementStore {

  movementList: MovementInterface[] | [] = []

  constructor() {
    makeObservable(this, {
      movementList: observable,
      fetchMovements: action,
      setMovements : action,
    });
  }

  fetchMovements = async (movement_query: string) => {
    try {
      const response = await instance.post(movement_fetch_url, {
        'movement_query': movement_query
      });
      this.setMovements(response.data.data)
      return {
        status : true,
        data : {}
      }
    }

    catch(error : any){
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

  setMovements(movements : MovementInterface[]){
    this.movementList = movements
  }

}

const movementStore =new MovementStore();

export default movementStore;
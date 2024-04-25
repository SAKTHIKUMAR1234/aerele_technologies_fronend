import { action, makeObservable, observable } from "mobx";

class EditFormOpenStateStore {
  warehouseEdit: boolean = false;
  productEdit: boolean = false;
  movementEdit: boolean = false;

  constructor() {
    makeObservable(this, {
      warehouseEdit: observable,
      productEdit: observable,
      movementEdit: observable,
      setWarehouseEdit: action,
      setProductEdit: action,
      setMovementEdit: action,
    });
  }

  setWarehouseEdit = (value: boolean) => {
    this.warehouseEdit = value;
  };

  setProductEdit = (value: boolean) => {
    this.productEdit = value;
  };

  setMovementEdit = (value: boolean) => {
    this.movementEdit = value;
  };
}

const editFormOpenStateStore = new EditFormOpenStateStore();
export default editFormOpenStateStore;

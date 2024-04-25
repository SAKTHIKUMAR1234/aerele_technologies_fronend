import { observer } from 'mobx-react';
import React, { useState } from 'react';
import warehouseStore from '../../Store/WarehouseStore';
import Swal from 'sweetalert2';
import pageStore from '../../Store/PageStore';
import Warehouse from '../Warehouse/Warehouse';

interface FormData {
  name: string;
}

interface WarehouseCreateProps {
  showModal: boolean;
  onCloseModal: () => void;
}

const WarehouseCreate: React.FC<WarehouseCreateProps> = ({ showModal, onCloseModal }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
  });

  const [errors, setErrors] = useState({
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let valid = true;
    if(formData.name === ''){
      newErrors.name = 'Enter the warehouse name';
      valid = false;
    }
    setErrors(newErrors);
    if(!valid){
      return;
    }
    const result :any  = await warehouseStore.createWarehouse(formData.name)
    Swal.fire(result.data)
    setFormData({ name: '' });
    await warehouseStore.makeFetchData()
    pageStore.setState(Warehouse)
    onCloseModal();
  };

  return (
    <div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
            <h2>Create New Warehouse</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <button type="submit" className='button-9'>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(WarehouseCreate);

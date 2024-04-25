import React, { useState } from 'react';
import Location from '../../types/WarehouseInterface';
import warehouseStore from '../../Store/WarehouseStore';
import Swal from 'sweetalert2';
import pageStore from '../../Store/PageStore';
import Warehouse from '../Warehouse/Warehouse';

interface FormData {
  name: string;
}

interface WarehouseEditProps {
  showModal: boolean;
  onCloseModal: () => void;
  editLocationValue : Location
}
const WarehouseEdit: React.FC<WarehouseEditProps> = ({ showModal, onCloseModal , editLocationValue }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };
  const [errors, setErrors] = useState({
    name: ''
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let valid = true;
    if(formData.name === ''){
      newErrors.name = 'Enter the new Warehouse Name'
      valid = false;
    }
    setErrors(newErrors);
    if(!valid){
      return;
    }
    const result :any = await warehouseStore.updateWareHouse(editLocationValue.id , formData.name)
    Swal.fire(result.data)
    pageStore.setState(Warehouse)
    setFormData({ name: '' });
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
            <h2>Modal Title</h2>
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
              <button type="submit" className='button-9'>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseEdit;

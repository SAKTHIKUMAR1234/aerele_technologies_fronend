import React, { useState } from 'react';
import warehouseStore from '../../Store/WarehouseStore';

interface FormData {
  name: string;
  price: number;
  quantity: number;
  location: string;
}

interface ProductCreateProps {
  showModal: boolean;
  onCloseModal: () => void;
}

const ProductCreate: React.FC<ProductCreateProps> = ({ showModal, onCloseModal }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: 0,
    quantity: 0,
    location: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let valid = true;

    if (formData.name === '') {
      newErrors.name = 'Enter the product name';
      valid = false;
    }

    if (formData.price <= 0) {
      newErrors.price = 'Enter a valid price';
      valid = false;
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Enter a valid quantity';
      valid = false;
    }
    setErrors(newErrors);

    if (!valid) {
      return;
    }
    console.log('Form submitted:', formData);
    setFormData({ name: '', price: 0, quantity: 0, location: '' });
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
            <h2>Create New Product</h2>
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
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                {errors.price && <p className="error">{errors.price}</p>}
              </div>
              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
                {errors.quantity && <p className="error">{errors.quantity}</p>}
              </div>
              <div>
                <label htmlFor="location">Location:</label>
                <select id="location" name="location" value={formData.location} onChange={handleInputChange}>
                  <option value="">Select location</option>
                  {warehouseStore.locations.map(location => (
                    <option key={location.id} value={location.name}>{location.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className='button-9'>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreate;

import React, { useEffect, useState } from 'react';
import warehouseStore from '../../Store/WarehouseStore';
import productStore from '../../Store/ProductStore';
import Swal from 'sweetalert2';
import pageStore from '../../Store/PageStore';
import Products from '../Products/Products';

interface FormData {
  id : number,
  name: string;
  price: number;
  quantity: number;
  location: string;
}

interface ProductEditProps {
  showModal: boolean;
  onCloseModal: () => void;
  currentValue: any
}

const ProductEdit: React.FC<ProductEditProps> = ({ showModal, onCloseModal, currentValue }) => {
  const [formData, setFormData] = useState<FormData>({
    id : 0,
    name: '',
    price: 0,
    quantity: 0,
    location: '',
  });
  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      id : currentValue.id,
      name: currentValue.product_name,
      price: currentValue.product_price,
      quantity: currentValue.product_quantity,
      location: ''
    }));
  }, [currentValue])
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    quantity: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    if (formData.location === '') {
      newErrors.location = 'Select a warehouse'
      valid = false
    }
    setErrors(newErrors);
    if (!valid) {
      return;
    }
    const response : any  = await productStore.updateProduct(formData.id , {
      name : formData.name,
      price : formData.price,
      quantity : formData.quantity,
      location : formData.location
    })
    Swal.fire(response.data)
    await productStore.fetchProducts('')
    pageStore.setState(Products)
    setFormData({ id: 0, name: '', price: 0, quantity: 0, location: '' });
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
            <h2>Edit Product Details</h2>
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
                {errors.location && <p className="error">{errors.location}</p>}
                <select id="location" name="location" value={formData.location} onChange={handleInputChange}>
                  <option value="">Select location</option>
                  {warehouseStore.locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className='button-9'>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEdit;

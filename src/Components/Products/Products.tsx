import { useEffect, useState } from 'react';
import './Products.css'
import ProductEdit from '../ProductEdit/ProductEdit';
import ProductCreate from '../ProductCreate/ProductCreate';
import productStore from '../../Store/ProductStore';
import { observer } from 'mobx-react';
import Swal from 'sweetalert2';

const Products: React.FC = () => {

  const [searchQuery , setSearchQuery] = useState<string>('')

  const triggerFetch = async () =>{
    const result:any =await productStore.fetchProducts(searchQuery);
    if(result.status === false){
      Swal.fire(result.data)
    }
  }

  useEffect(() => {
    triggerFetch()
  }, []);

  const [showWarehouseEditModal, setShowProductEditModal] = useState<boolean>(false);
  const [showProductCreateModal, setShowProductCreateModal] = useState<boolean>(false);


  const handleOpenProductEditModal = () => {
    setShowProductEditModal(true);
  };

  const handleCloseProductEditModal = () => {
    setShowProductEditModal(false);
  };
  const handleOpenProductCreateModal = () => {
    setShowProductCreateModal(true);
  };

  const handleCloseProductCreateModal = () => {
    setShowProductCreateModal(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="product-main">
      <ProductEdit showModal={showWarehouseEditModal} onCloseModal={handleCloseProductEditModal} />
      <ProductCreate showModal={showProductCreateModal} onCloseModal={handleCloseProductCreateModal} />
      <div className="product-search-container">
        <input type="text" value={searchQuery} onChange={handleSearchInputChange}></input>
        <button className='button-9' onClick={triggerFetch}>search</button>
        <button className='button-9' onClick={handleOpenProductCreateModal}>Create</button>
      </div>
      <table className="product-main-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">Id</th>
            <th className="table-head-data">Product</th>
            <th className="table-head-data">Warehouse</th>
            <th className="table-head-data">Quantity</th>
            <th className="table-head-data">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {productStore.products.map(product => (
            <tr key={product.id}>
              <td className="table-head-data">{product.id}</td>
              <td className="table-head-data">{product.product_name}</td>
              <td className="table-head-data">{product.product_location}</td>
              <td className="table-head-data">{product.product_quantity}</td>
              <td>
                <div className="action-cls">
                  <button type='button' className='button-10' onClick={handleOpenProductEditModal}>Edit</button>
                  <button type='button' className='button-10'>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default observer(Products);
import { useEffect, useState } from 'react';
import './Products.css'
import ProductEdit from '../ProductEdit/ProductEdit';
import ProductCreate from '../ProductCreate/ProductCreate';
import productStore from '../../Store/ProductStore';
import { observer } from 'mobx-react';
import Swal from 'sweetalert2';
import { Product } from '../../types/ProductInterface';

const Products: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    triggerFetch()
  }, []);

  const triggerFetch = async () => {
    const result: any = await productStore.fetchProducts(searchQuery);
    if (result.status === false) {
      Swal.fire(result.data)
    }
  }

  const [showWarehouseEditModal, setShowProductEditModal] = useState<boolean>(false);
  const [showProductCreateModal, setShowProductCreateModal] = useState<boolean>(false);
  const [currentEditValue, setCurrentEditValue] = useState<Product>({
    id: 0,
    product_location: '',
    product_name: '',
    product_price: 0,
    product_quantity: 0

  });


  const handleOpenProductEditModal = (product: any) => {
    setCurrentEditValue({
      id : product.id,
      product_location : product.product_location,
      product_name : product.product_name,
      product_price : product.product_price,
      product_quantity : product.product_quantity
    })
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

  const handleProductDelete = async (productId : number) => {
    const result : any = await productStore.deleteProduct(productId);
    Swal.fire(result.data)
    if (result.status === true){
      triggerFetch()
    }
  }

  return (
    <div className="product-main">
      <ProductEdit showModal={showWarehouseEditModal} onCloseModal={handleCloseProductEditModal} currentValue={currentEditValue} />
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
            <th className='table-head-data'>Price</th>
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
              <td className="table-head-data">{product.product_price}</td>
              <td>
                <div className="action-cls">
                  <button type='button' className='button-10' onClick={() => {handleOpenProductEditModal(product)}}>Edit</button>
                  <button type='button' className='button-10' onClick={()=>handleProductDelete(product.id)}>Delete</button>
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
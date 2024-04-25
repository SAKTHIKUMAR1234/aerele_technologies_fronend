import './Products.css'

const Products: React.FC = () => {
  return (
    <div className="product-main">
      <div className="product-search-container">
        <input type="text"></input>
        <button className='button-9'>search</button>
      </div>
      <table className="product-main-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">Product</th>
            <th className="table-head-data">Warehouse</th>
            <th className="table-head-data">Quantity</th>
            <th className="table-head-data">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr>
            <td className="table-head-data">Product</td>
            <td className="table-head-data">Warehouse</td>
            <td className="table-head-data">Quantity</td>
            <td>
              <div className="action-cls">
                <button type='button' className='button-10'>Edit</button>
                <button type='button' className='button-10'>Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default Products;
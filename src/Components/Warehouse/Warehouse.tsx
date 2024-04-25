import './Warehouse.css'


const Warehouse: React.FC = () => {
  return (
    <div className="warehouse-main">
      <div className="warehouse-search-container">
        <input type="text"></input>
        <button className='button-9'>search</button>
      </div>
      <table className="warehouse-main-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">Id</th>
            <th className="table-head-data">Warehouse</th>
            <th className="table-head-data">Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr>
            <td className="table-head-data">Product</td>
            <td className="table-head-data">Warehouse</td>
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

export default Warehouse;

import './Movement.css'

const Movement: React.FC = () => {
  return (
    <div className="movement-main">
      <div className="movement-search-container">
        <input type="text"></input>
        <button className='button-9'>search</button>
      </div>
      <table className="movement-main-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">From</th>
            <th className="table-head-data">To</th>
            <th className="table-head-data">Product</th>
            <th className="table-head-data">Quantity</th>
            <th className="table-head-data">Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr>
            <td className="table-head-data">movement</td>
            <td className="table-head-data">Warehouse</td>
            <td className="table-head-data">Quantity</td>
            <td className="table-head-data">Quantity</td>
            <td>
              <div className="action-cls">
                <button type='button' className='button-10'>Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default Movement;
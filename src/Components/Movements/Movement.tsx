import { observer } from 'mobx-react';
import './Movement.css'
import movementStore from '../../Store/MovementStore';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Movement: React.FC = () => {


  const [searchQuery, setSearchQuery] = useState<string>("");

  const triggerFetch = async () => {
    const result: any = await movementStore.fetchMovements(searchQuery);
    if (result.status === false) {
      Swal.fire(result.data)
    }
  }

  useEffect(() => {
    triggerFetch()
  }, []);

  const handleSearch = () => {
    triggerFetch()
  };



  return (
    <div className="movement-main">
      <div className="movement-search-container">
      <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='button-9' onClick={handleSearch}>search</button>
      </div>
      <table className="movement-main-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">From</th>
            <th className="table-head-data">Current Warehouse</th>
            <th className="table-head-data">Product</th>
            <th className="table-head-data">Quantity</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {movementStore.movementList.map((movement, index) => (
            <tr key={index}>
              <td className="table-head-data">{movement.from}</td>
              <td className="table-head-data">{movement.to}</td>
              <td className="table-head-data">{movement.product}</td>
              <td className="table-head-data">{movement.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default observer(Movement);
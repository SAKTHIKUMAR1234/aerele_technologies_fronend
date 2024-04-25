import { useEffect, useState } from 'react';
import WarehouseEdit from '../WarehouseEdit/WarehouseEdit';
import './Warehouse.css'
import WarehouseCreate from '../WarehouseCreate/WarehouseCreate';
import warehouseStore from '../../Store/WarehouseStore';
import Swal from 'sweetalert2';
import { observer } from 'mobx-react';
import Location from '../../types/WarehouseInterface';


const Warehouse: React.FC = () => {

  const [showWarehouseEditModal, setShowWarehouseEditModal] = useState<boolean>(false);
  const [showWarehouseCreateModal, setShowWarehouseCreateModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [warehouseLocation,setWarehouseLocations] = useState<any>([])
  const [editWarehouseValue , setEditWarehouseValue] = useState<Location>({
    id : 0,
    name : ''
  })

  const triggerFetch = async () =>{
    const result:any =await warehouseStore.makeFetchData();
    setWarehouseLocations(warehouseStore.locations)
    if(result.status === false){
      Swal.fire(result.data)
    }
  }

  useEffect(() => {
    triggerFetch()
  }, []);

  const handleOpenWarehouseEditModal = (location : Location) => {
    setEditWarehouseValue(location);
    setShowWarehouseEditModal(true);
  };

  const handleCloseWarehouseEditModal = () => {
    setShowWarehouseEditModal(false);
  };

  const handleOpenWarehouseCreateModal = () => {
    setShowWarehouseCreateModal(true);
  };

  const handleCloseWarehouseCreateModal = () => {
    setShowWarehouseCreateModal(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    warehouseStore.setSearchQuery(searchQuery);
    triggerFetch()
  };

  return (
    <div className="warehouse-main">
      <WarehouseEdit showModal={showWarehouseEditModal} onCloseModal={handleCloseWarehouseEditModal} editLocationValue = {editWarehouseValue} />
      <WarehouseCreate showModal={showWarehouseCreateModal} onCloseModal={handleCloseWarehouseCreateModal} />
      <div className="warehouse-search-container">
        <input type="text" value={searchQuery} onChange={handleSearchInputChange}></input>
        <button className='button-9' onClick={handleSearch}>search</button>
        <button className='button-9' onClick={handleOpenWarehouseCreateModal}>Create</button>
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
          {warehouseLocation.map((location : any) => (
            <tr key={location.id}>
              <td className="table-head-data">{location.id}</td>
              <td className="table-head-data">{location.name}</td>
              <td>
                <div className="action-cls">
                  <button type='button' className='button-10' onClick={()=>handleOpenWarehouseEditModal(location)}>Edit</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default observer(Warehouse);

import { useEffect } from 'react';
import pageStore from '../../Store/PageStore';
import userStore from '../../Store/UserStore';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import './Header.css'
import { observer } from 'mobx-react';
import Profile from '../Profile/Profile';
import Warehouse from '../Warehouse/Warehouse';
import Products from '../Products/Products';
import Movement from '../Movements/Movement';
import logoutStore from '../../Store/LogoutStore';
import Swal from 'sweetalert2';




const Header = observer(() => {

  const fetchUserData = async () => {
    await userStore.fetchData()
  }

  const makeLogout = async () => {
    const firing_data : any  = await logoutStore.makeLogout()
    Swal.fire(firing_data)
    userStore.clearData()
  }

  useEffect(() => { fetchUserData() }, [])

  return (
    <header className="header-main">
      <div className="header-name-display">
        Warehouse<span />Management<span />System
      </div>
      {userStore.userData === null ?
        <div className="header-sections header-section-nonlogin">
          <div className="header-div" onClick={() => pageStore.setState(Login)}>Login</div>
          <div className="header-div" onClick={() => pageStore.setState(Signup)}>SignUp</div>
        </div>
        :
        <div className="header-sections">
          <div className="header-div" onClick={() => pageStore.setState(Products)}>Products</div>
          <div className="header-div" onClick={() => pageStore.setState(Movement)}>Movements</div>
          <div className="header-div" onClick={() => pageStore.setState(Warehouse)}>Warehouse</div>
          <div className="header-div" onClick={() => pageStore.setState(Profile)}>Profile</div>
          <div className="header-div" onClick={makeLogout}>Logout</div>
        </div>
      }
    </header>
  );

})


export default Header;
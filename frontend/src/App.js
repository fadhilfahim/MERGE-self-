import { BrowserRouter, Routes, Route} from 'react-router-dom'
import React, {useState} from "react";
//pages and components if inventory
import Home from './pages/Home'
import NavbarInventory from './components/NavigateInventory'
import NewProduct from './pages/NewProduct';
import UpdatePage from './pages/UpdatePage';
// OrderManagmentScreens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
//orderManagment component
import Backdrop from "./components/Backdrop";
import SideDrawer from "./components/SideDrawer";
import DeliveryForm from "./screens/DeliveryForm";
import './styles/style.css';


function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarInventory/>

      <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
      <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>

      <div className='pages'>
        <Routes>
        <Route path='/' element={<HomeScreen/>} />
          <Route path='/product/:id'  element={<ProductScreen/>} />
          <Route path='/cart'  element={<CartScreen/>} />
          <Route exact path="/delivery" element={<DeliveryForm/>} />
          <Route
            path="/Home"
            element={<Home />}
          />
          <Route
            path='/NewProduct'
            element={<NewProduct />}
          />
          <Route
            path='/UpdatePage/:id'
            element={<UpdatePage />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

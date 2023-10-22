import { BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import NavbarInventory from './components/NavigateInventory'
import NewProduct from './pages/NewProduct';
import UpdatePage from './pages/UpdatePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarInventory/>
      <div className='pages'>
        <Routes>
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

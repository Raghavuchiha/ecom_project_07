import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import SearchBar from './components/SearchBar'
import Men from './pages/men'
import Women from './pages/women'
import Kid from  './pages/kid'
import Profile from "./pages/profile";
  import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className = 'w-full'>
     <ToastContainer/>
     <Navbar/>
     <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/collection' element={<Collection/>} />
        <Route path =  '/men' element={<Men/>}/>
        <Route path =  '/kid' element={<Kid/>}/>
        <Route path = '/women' element = {<Women/>} />
         <Route path = '/about' element={<About/>} />
         <Route path = '/contact' element={<Contact/>} />
         <Route path = '/product/:productID' element={<Product/>} />
         <Route path = '/cart' element={<Cart/>} />
         <Route path = '/Login' element={<Login/>} />
         <Route path = '/place-order' element={<PlaceOrder/>} />
         <Route path = '/Orders' element={<Orders/>} />
         <Route path="/profile" element={<Profile />} />
     



     </Routes>
     <Footer/>
    </div>
  )
}

export default App


import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import Category from './pages/Category'
import Product from './pages/Product'
import Role from './pages/Role'
import Petugas from './pages/Petugas'
import Login from './pages/Login'
import Register from './pages/Register'
// import Page from './pages/Pages'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <AppLayout />
        }>

          <Route index element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/petugas" element={<Petugas />} />
          <Route path="/role" element={<Role />} />

        </Route>
      </Routes>
      
    </>
  )
}

export default App

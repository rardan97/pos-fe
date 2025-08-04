
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import Category from './pages/Category'
import Product from './pages/Product'
import Role from './pages/Role'
import Petugas from './pages/Petugas'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import Kasir from './pages/Kasir'
import Transaksi from './pages/Transaksi'
// import Page from './pages/Pages'

function App() {

  return (
    <>
     <AuthProvider>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
          
        }>

           

          <Route index element={<Home />} />
          <Route path="/kasir" element={<Kasir />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/petugas" element={<Petugas />} />
          <Route path="/role" element={<Role />} />

        </Route>
      </Routes>
      </AuthProvider>    
      
    </>
  )
}

export default App

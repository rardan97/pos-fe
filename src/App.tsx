
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
// import Page from './pages/Pages'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <AppLayout />
        }>
          <Route index element={<Home />} />

        </Route>
      </Routes>
      
    </>
  )
}

export default App

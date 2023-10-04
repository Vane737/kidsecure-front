// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Acerca } from './pages/Acerca'
import { Home } from './pages/Home'
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Contacto from './pages/Contacto';
// import viteLogo from '/vite.svg'




function App() {

  return (
    <div className=''>
      <BrowserRouter> {/* Proveedor de la libreria */}
        <NavBar />
        <div className='flex'>
        <SideBar />
        <Routes>       {/* El que contendra las rutas */}
          <Route path='/' element={<Home />} />
          <Route path='/acerca' element={<Acerca /> } />
          <Route path='/contacto' element={ <Contacto /> } />
          <Route path='/personal'>
            <Route path=':id' element={<div>Persona</div>} />
          </Route>
          <Route path='/padres'>
            <Route path=':id' element={<div>Padre</div>} />
          </Route>
          <Route path='/niños'>
            <Route path=':id' element={<div>Niño</div>} />
          </Route>

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App

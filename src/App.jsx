// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Home } from './pages/Home'
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Contacto from './pages/Contacto';
import { Children,  CreateEditChildren, ReadChildren  } from './pages/children';
import { Parents, CreateEditParents, ReadParents } from './pages/parents';
import { Personnel, ReadPersonnel, CreateEditPersonnel, VerifyPersonnel } from './pages/personnel';
import { Classroom, CreateEditClassroom, ReadClassroom, ChildrenList } from './pages/classroom';
import { ViolenceCamera } from './pages/violence';

// import viteLogo from '/vite.svg'




function App() {

  return (
    <div className=''>
      <BrowserRouter> {/* Proveedor de la libreria */}
        <NavBar />
        <div className='flex'>
        <SideBar />
        <Routes>       {/* El que contendra las rutas */}
          <Route path='/' element={<Contacto />} />
          <Route path='/contacto' element={ <Contacto /> } />

          <Route path='/niños'>
            <Route index element={<Children /> } />
            <Route path='create' element={<CreateEditChildren /> } />
            <Route path='edit' element={<CreateEditChildren /> } />
            <Route path=':id' element={<ReadChildren /> } />
          </Route>

          <Route path='/personal'>
            <Route index element={<Personnel /> } />
            <Route path='create/:id' element={<CreateEditPersonnel /> } />
            <Route path='edit' element={<CreateEditPersonnel /> } />
            <Route path=':id' element={<ReadPersonnel /> } />
            <Route path='verificar/:id' element={<VerifyPersonnel /> } />
          </Route>
          <Route path='/padres/:id'>
            <Route index element={<Parents /> } />
            <Route path='create/:id' element={<CreateEditParents /> } />
            <Route path='edit' element={<CreateEditParents /> } />
            <Route path=':id' element={<ReadParents /> } />
          </Route>
          
          <Route path='/salas'>
            <Route index element={<Classroom /> } />
            <Route path='create' element={<CreateEditClassroom /> } />
            <Route path='edit/:id' element={<CreateEditClassroom /> } />
            <Route path=':id' element={<ReadClassroom /> } />
            <Route path='admin/:id' element={<ChildrenList /> } />
          </Route>

          <Route path='/mensajes'>
            <Route index element={<Classroom /> } />
            <Route path='create' element={<CreateEditClassroom /> } />
            <Route path='edit/:id' element={<CreateEditClassroom /> } />
            <Route path=':id' element={<ReadClassroom /> } />
          </Route>

          <Route path='/deteccion'>
            <Route index element={<ViolenceCamera /> } />
            <Route path='create' element={<CreateEditClassroom /> } />
            <Route path='edit/:id' element={<CreateEditClassroom /> } />
            <Route path=':id' element={<ReadClassroom /> } />
          </Route>

          {/* <Route path='/padres'>
            <Route path=':id' element={<div>Padre</div>} />
          </Route>
          <Route path='/niños'>
            <Route path=':id' element={<div>Niño</div>} />
          </Route> */}

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App

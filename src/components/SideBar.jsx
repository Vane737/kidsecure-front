import { HomeIcon, SunIcon, ClipboardDocumentCheckIcon, ViewColumnsIcon, ChatBubbleLeftEllipsisIcon, ViewfinderCircleIcon  } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';



  export default function SideBar() {
    return (
      <aside className="bg-white text-customDark w-72 min-h-[calc(100vh-64px)] p-4 font-bold drop-shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Mi Sidebar</h2>
      </div>
      <nav>
        <ul>
          {/* p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary */}
          <li className="">
            <NavLink to="/" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
            <HomeIcon className="h-5 w-5 mr-2" />
              Inicio
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/niños" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <SunIcon className="h-5 w-5 mr-2"/>
              Gestion familiar
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/salas" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <ViewColumnsIcon className="h-5 w-5 mr-2"/>
              Gestion de salas
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/contacto" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
              Control de Salida
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/mensajes" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />
              Mensajes
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/deteccion" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <ViewfinderCircleIcon className="h-5 w-5 mr-2" />
              Detección de Violencia
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
      );
    }
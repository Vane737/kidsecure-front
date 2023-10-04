import { HomeIcon, UserIcon, CogIcon, QuestionMarkCircleIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';



  export default function SideBar() {
    return (
      <aside className="bg-white text-customDark w-64 h-[calc(100vh-64px)] p-4 border-2 border-r-indigo-200 font-bold">
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
            <NavLink to="/acerca" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Perfil
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/contacto" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <PhoneIcon className="h-5 w-5 mr-2" />
              Contacto
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/configuracion" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <CogIcon className="h-5 w-5 mr-2" />
              Configuración
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/ayuda" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
              Ayuda
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
      );
    }
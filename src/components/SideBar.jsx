import { HomeIcon, SunIcon, CogIcon, QuestionMarkCircleIcon, ClipboardDocumentCheckIcon, ChatBubbleLeftIcon  } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';



  export default function SideBar() {
    return (
      <aside className="bg-white text-customDark w-72 h-[calc(100vh-64px)] p-4 font-bold drop-shadow-lg">
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
             {/* <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-720q-33 0-56.5-23.5T640-800q0-33 23.5-56.5T720-880q33 0 56.5 23.5T800-800q0 33-23.5 56.5T720-720ZM680-80v-320q0-40-20.5-72T607-522l35-103q8-25 29.5-40t48.5-15q27 0 48.5 15t29.5 40l102 305H800v240H680ZM500-500q-25 0-42.5-17.5T440-560q0-25 17.5-42.5T500-620q25 0 42.5 17.5T560-560q0 25-17.5 42.5T500-500ZM220-720q-33 0-56.5-23.5T140-800q0-33 23.5-56.5T220-880q33 0 56.5 23.5T300-800q0 33-23.5 56.5T220-720ZM140-80v-280H80v-240q0-33 23.5-56.5T160-680h120q33 0 56.5 23.5T360-600v240h-60v280H140Zm300 0v-160h-40v-160q0-25 17.5-42.5T460-460h80q25 0 42.5 17.5T600-400v160h-40v160H440Z"/></svg> */}
              Gestion familiar
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/contacto" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
              Asistencia
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/configuracion" 
            className={({ isActive }) => (isActive? "p-3 flex items-center rounded-sm bg-firstop bg-opacity-100 text-primary" : "p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary")}
            >
              <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
              Mensajes
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
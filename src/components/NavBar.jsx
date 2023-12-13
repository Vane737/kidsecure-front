import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import { usePopper } from 'react-popper';
import NotificationItem from './utils/NotificationItem'; // Asegúrate de importar correctamente el componente NotificationItem
import io from "socket.io-client";
import Default from '../assets/img/logo.png';


const NavBar = ( ) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  
  
  const openNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };
  
  useEffect(() => {
    const socketInstance = io('https://notifications-0v22.onrender.com/');
    // const socketInstance = io('http://localhost:5000');
    setSocket(socketInstance);
  
    console.log('Se ha ejecutado el useffect en el navbar');
    // Escuchar eventos de notificación solo una vez
    socketInstance.on('notification_processed', (notification) => {
      // Manejar el evento de notificación aquí
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
      console.log('Evento de notificación recibido:', notification);
      console.log('Se ha incrementado la notificación');
      setNotificationCount((prevCount) => prevCount + 1);
    });  
    // listen for events emitted by the server
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    }  
  }, []); 

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-10, -5], // Ajusta el desplazamiento según tus necesidades
        },
      },
    ],
  });

  return (
    <nav className="bg-primary py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
        <img
          src={Default} // Reemplaza con la ruta a tu ícono
          alt="Notification Icon"
          className="h-10 w-16"
        />
        </Link>

        <div className="flex items-center space-x-2">
          {/* Icono de campana con conteo de notificaciones */}
          <div
            ref={setReferenceElement}
            onClick={openNotification}
            className="cursor-pointer relative"
          >
            <BellIcon className="h-12 w-8 text-secondary" />
            { notificationCount >= 0 && (
              <div className="absolute bottom-7 right-0 text-xs font-semibold pt-0.5 bg-customPink text-white rounded-full w-4 h-5 text-center">
                {notificationCount}
              </div>
            )}
          </div>

          {/* Información del usuario */}
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-300" />
            <span className="text-white">Usuario</span>
          </div>
        </div>
        {isNotificationOpen || notifications && (
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="fixed bg-emerald-50 p-4 rounded-md shadow-md"
          >
            {notifications.map((notification, index) => (
              <NotificationItem key={index} notification={notification} />
            ))}
          </div>
        )}
      </div>

      {/* Popover de Notificaciones */}
    </nav>
  );
};

export default NavBar;

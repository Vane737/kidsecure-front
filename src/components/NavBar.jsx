// ... (importaciones)

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import { usePopper } from 'react-popper';
import NotificationItem from './utils/NotificationItem';
import io from 'socket.io-client';
import Default from '../assets/img/logo.png';
import { storageSave, storageGet } from '../services/storage';

const NavBar = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('https://notifications-0v22.onrender.com/');
    setSocket(socketInstance);

    socketInstance.on('notification_processed', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
      setNotificationCount((prevCount) => prevCount + 1);

      // Guarda la notificación en el localStorage
      storageSave('notifications', [...notifications, notification]);
      storageSave('notificationCount', notificationCount + 1);
    });

    // Recupera las notificaciones almacenadas en el localStorage al montar el componente
    const storedNotifications = storageGet('notifications') || [];
    const storedCount = storageGet('notificationCount') || 0;

    setNotifications(storedNotifications);
    setNotificationCount(storedCount);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-10, -5],
        },
      },
    ],
  });

  const handleNotificationClick = () => {
    setNotificationOpen(!isNotificationOpen);

    // Si la sección de notificaciones está abierta, reinicia el contador a 0
    if (isNotificationOpen) {
      setNotificationCount(0);

      // Actualiza las notificaciones almacenadas y limpia el localStorage
      storageSave('notificationCount', 0);
    }
  };

  return (
    <nav className="bg-primary py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          <img src={Default} alt="Notification Icon" className="h-10 w-16" />
        </Link>

        <div className="flex items-center space-x-2">
          <div
            ref={setReferenceElement}
            onClick={handleNotificationClick}
            className="cursor-pointer relative"
          >
            <BellIcon className="h-12 w-8 text-secondary" />
            {notificationCount > 0 && (
              <div className="absolute bottom-7 right-0 text-xs font-semibold pt-0.5 bg-customPink text-white rounded-full w-4 h-5 text-center">
                {notificationCount}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-300" />
            <span className="text-white">Usuario</span>
          </div>
        </div>

        {isNotificationOpen && notifications.length > 0 ? (
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
        ) : (
          isNotificationOpen && notifications.length <= 0 && (
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="fixed bg-emerald-50 p-4 rounded-md shadow-md"
            >
              <p>No tienes notificaciones que mostrar.</p>
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default NavBar;
